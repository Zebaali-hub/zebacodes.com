import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getRoadmap, roadmaps } from '@/data/roadmaps'
import { PageEnvironment } from '@/components/ui/PageEnvironment'
import { RoadmapFramework } from '@/components/RoadmapGraph'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return roadmaps.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const roadmap = getRoadmap((await params).slug); return roadmap ? { title: `${roadmap.title} Roadmap`, description: roadmap.scope, alternates: { canonical: `/roadmaps/${roadmap.slug}` } } : {} }

export default async function RoadmapPage({ params }: Props) {
  const roadmap = getRoadmap((await params).slug)
  if (!roadmap) notFound()
  return <div className="experience-page roadmap-experience"><PageEnvironment tone="map" /><Link className="experience-back" href="/roadmaps"><ArrowLeft size={15} /> All roadmaps</Link><header className="roadmap-detail-hero"><p><span>{roadmap.status}</span> Roadmap framework</p><h1>{roadmap.title}</h1><strong>{roadmap.scope}</strong></header><RoadmapFramework roadmap={roadmap} /></div>
}
