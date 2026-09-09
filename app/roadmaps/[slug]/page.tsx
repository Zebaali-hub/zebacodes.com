import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { roadmaps as legacyRoadmaps, getRoadmap as getLegacyRoadmap } from '@/data/roadmaps'
import { PageEnvironment } from '@/components/ui/PageEnvironment'
import { RoadmapFramework } from '@/components/RoadmapGraph'
import { RoadmapExplorer } from '@/features/roadmap/RoadmapExplorer'
import { buildIndex, buildRoadmapView, roadmapIdForSlug, roadmapNav, SLUGS } from '@/features/roadmap/build'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  const modern = Object.values(SLUGS).map((slug) => ({ slug }))
  const legacy = legacyRoadmaps
    .map((r) => r.slug)
    .filter((slug) => !roadmapIdForSlug(slug))
    .map((slug) => ({ slug }))
  return [...modern, ...legacy]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const id = roadmapIdForSlug(slug)
  if (id) {
    const view = buildRoadmapView(id)
    if (view) {
      return {
        title: `${view.title} Roadmap`,
        description: view.scope,
        alternates: { canonical: `/roadmaps/${view.slug}` },
      }
    }
  }
  const legacy = getLegacyRoadmap(slug)
  return legacy ? { title: `${legacy.title} Roadmap`, description: legacy.scope } : {}
}

export default async function RoadmapPage({ params }: Props) {
  const { slug } = await params
  const id = roadmapIdForSlug(slug)

  if (id) {
    const view = buildRoadmapView(id)
    if (!view) notFound()
    return (
      <Suspense fallback={<div className="ws rx-loading" />}>
        <RoadmapExplorer roadmap={view} index={buildIndex()} nav={roadmapNav()} />
      </Suspense>
    )
  }

  // Roadmaps that have no authored content yet keep the original framework view.
  const legacy = getLegacyRoadmap(slug)
  if (!legacy) notFound()
  return (
    <div className="experience-page roadmap-experience">
      <PageEnvironment tone="map" />
      <Link className="experience-back" href="/roadmaps"><ArrowLeft size={15} /> All roadmaps</Link>
      <header className="roadmap-detail-hero">
        <p><span>{legacy.status}</span> {legacy.steps.length} learning stages</p>
        <h1>{legacy.title}</h1>
        <strong>{legacy.scope}</strong>
      </header>
      <RoadmapFramework roadmap={legacy} />
    </div>
  )
}
