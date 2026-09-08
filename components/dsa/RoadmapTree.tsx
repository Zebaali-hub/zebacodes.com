'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight, Target } from 'lucide-react'
import type { Pattern, Tier, Topic } from '@/data/dsa/types'

export type TopicNode = {
  topic: Topic
  patterns: Pattern[]
  questionCounts: Record<string, number>
}

export type TierNode = {
  tier: Tier
  topics: TopicNode[]
  patternCount: number
  questionCount: number
}

/**
 * Collapsible roadmap.
 *
 * Tier 1 opens by default and Tiers 2 and 3 start closed, so the page
 * begins as three headers plus one tier rather than an endless scroll.
 * Expanding a topic reveals its patterns WITH their sub-patterns and the
 * recognition signal — the point of the roadmap is pattern recognition,
 * so it belongs here, not one click away.
 */
export function RoadmapTree({ tiers }: { tiers: TierNode[] }) {
  const [openTiers, setOpenTiers] = useState<Set<number>>(new Set([1]))
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())

  const toggleTier = (id: number) =>
    setOpenTiers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleTopic = (id: string) =>
    setOpenTopics((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="rt">
      {tiers.map((node) => {
        const tierOpen = openTiers.has(node.tier.id)
        return (
          <section key={node.tier.id} className="rt-tier" data-tier={node.tier.id}>
            <button
              type="button"
              className="rt-tier-head"
              onClick={() => toggleTier(node.tier.id)}
              aria-expanded={tierOpen}
            >
              <ChevronRight className="rt-caret" size={20} aria-hidden="true" />
              <span className="rt-tier-badge">Tier {node.tier.id}</span>
              <span className="rt-tier-title">{node.tier.title}</span>
              <span className="rt-tier-counts">
                {node.topics.length} topics · {node.patternCount} patterns
                {node.questionCount > 0 ? ` · ${node.questionCount} questions` : ''}
              </span>
            </button>

            {tierOpen ? (
              <div className="rt-topics">
                {node.topics.map((entry) => {
                  const topicOpen = openTopics.has(entry.topic.id)
                  return (
                    <div key={entry.topic.id} className={`rt-topic ${topicOpen ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="rt-topic-head"
                        onClick={() => toggleTopic(entry.topic.id)}
                        aria-expanded={topicOpen}
                        disabled={entry.patterns.length === 0}
                      >
                        <ChevronRight className="rt-caret" size={17} aria-hidden="true" />
                        <span className="rt-topic-title">{entry.topic.title}</span>
                        <span className="rt-topic-count">
                          {entry.patterns.length > 0 ? `${entry.patterns.length} patterns` : 'pending'}
                        </span>
                      </button>

                      {topicOpen ? (
                        <div className="rt-patterns">
                          {entry.patterns.map((pattern) => (
                            <article key={pattern.id} className="rt-pattern">
                              <header>
                                <Link href={`/roadmaps/dsa/patterns/${pattern.id}`}>
                                  {pattern.title} <ArrowUpRight size={13} aria-hidden="true" />
                                </Link>
                                {entry.questionCounts[pattern.id] ? (
                                  <span className="rt-qcount">{entry.questionCounts[pattern.id]} Q</span>
                                ) : null}
                                {pattern.googlePriority ? <span className="rt-google">Google</span> : null}
                              </header>

                              {pattern.subPatterns.length > 0 ? (
                                <ul className="rt-subs">
                                  {pattern.subPatterns.map((sub) => <li key={sub}>{sub}</li>)}
                                </ul>
                              ) : null}

                              {pattern.recognitionSignals[0] ? (
                                <p className="rt-signal">
                                  <Target size={13} aria-hidden="true" />
                                  <span><b>Recognise it when:</b> {pattern.recognitionSignals[0]}</span>
                                </p>
                              ) : null}
                            </article>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
