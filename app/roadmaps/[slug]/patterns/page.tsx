import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { patterns } from '@/data/dsa/patterns'
import { topics } from '@/data/dsa/topics'
import { questionsByPattern } from '@/data/dsa/questions'
import { PageEnvironment } from '@/components/ui/PageEnvironment'

export const metadata: Metadata = {
  title: 'DSA Patterns',
  description: 'Every pattern in the DSA roadmap, with prerequisites, recognition signals and a curated question ladder.',
  alternates: { canonical: '/roadmaps/dsa/patterns' },
}

export function generateStaticParams() {
  return [{ slug: 'dsa' }]
}

export default async function PatternIndexPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug !== 'dsa') notFound()

  const authoredTopics = topics.filter((topic) => patterns.some((p) => p.topicId === topic.id))

  return (
    <div className="experience-page dsa-page">
      <PageEnvironment tone="map" />
      <Link className="experience-back" href="/roadmaps/dsa"><ArrowLeft size={15} /> DSA roadmap</Link>
      <header className="dsa-hero">
        <p className="dsa-eyebrow">Pattern explorer</p>
        <h1>Recognition, not definitions.</h1>
        <p className="dsa-lead">
          Knowing what a sliding window is has never been the hard part. Each page below leads with the
          constraint shapes and problem wording that should make you reach for the pattern in the first place.
        </p>
      </header>

      <div className="dsa-topic-list">
        {authoredTopics.map((topic) => (
          <section key={topic.id} className="dsa-topic-block">
            <div className="dsa-topic-head">
              <span className="dsa-chip" data-tier={topic.tier}>Tier {topic.tier}</span>
              <h2>{topic.title}</h2>
              <p>{topic.summary}</p>
            </div>
            <ul className="dsa-pattern-grid">
              {patterns.filter((p) => p.topicId === topic.id).map((pattern) => {
                const count = questionsByPattern(pattern.id).length
                return (
                  <li key={pattern.id}>
                    <Link href={`/roadmaps/dsa/patterns/${pattern.id}`}>
                      <strong>{pattern.title} <ArrowUpRight size={13} aria-hidden="true" /></strong>
                      <span>{pattern.purpose}</span>
                      <em>{count > 0 ? `${count} question${count === 1 ? '' : 's'}` : 'Questions pending'}</em>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
