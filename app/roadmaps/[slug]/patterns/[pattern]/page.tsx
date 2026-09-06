import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPattern, patterns } from '@/data/dsa/patterns'
import { getTopic } from '@/data/dsa/topics'
import { questionsByPattern } from '@/data/dsa/questions'
import { directPrerequisites, directUnlocks } from '@/lib/dsa/graph'
import { PageEnvironment } from '@/components/ui/PageEnvironment'
import { PatternExplorer } from '@/components/dsa/PatternExplorer'

type Props = { params: Promise<{ slug: string; pattern: string }> }

/**
 * Nested under the existing [slug] segment on purpose. A static
 * app/roadmaps/dsa/ folder would take precedence over [slug] and shadow
 * the published roadmap page, so the depth pages live here instead.
 */
export function generateStaticParams() {
  return patterns.map((pattern) => ({ slug: 'dsa', pattern: pattern.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pattern = getPattern((await params).pattern)
  if (!pattern) return {}
  return {
    title: `${pattern.title} — DSA Pattern`,
    description: pattern.purpose,
    alternates: { canonical: `/roadmaps/dsa/patterns/${pattern.id}` },
  }
}

export default async function PatternPage({ params }: Props) {
  const { slug, pattern: patternId } = await params
  if (slug !== 'dsa') notFound()

  const pattern = getPattern(patternId)
  if (!pattern) notFound()

  const topic = getTopic(pattern.topicId)

  return (
    <div className="experience-page dsa-page">
      <PageEnvironment tone="map" />
      <Link className="experience-back" href={`/roadmaps/${slug}`}>
        <ArrowLeft size={15} /> {topic?.title ?? 'DSA roadmap'}
      </Link>
      <PatternExplorer
        pattern={pattern}
        topic={topic}
        questions={questionsByPattern(pattern.id)}
        prerequisites={directPrerequisites(pattern.id)}
        unlocks={directUnlocks(pattern.id)}
      />
    </div>
  )
}
