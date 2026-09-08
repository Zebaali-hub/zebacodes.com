import { tiers } from '@/data/dsa/tiers'
import { topics } from '@/data/dsa/topics'
import { patterns, patternsByTopic } from '@/data/dsa/patterns'
import { questions, questionsByPattern } from '@/data/dsa/questions'
import { RoadmapTree, type TierNode } from './RoadmapTree'

/** Builds the tree on the server; RoadmapTree only handles open/closed state. */
export function DsaRoadmap() {
  const nodes: TierNode[] = tiers.map((tier) => {
    const tierTopics = topics
      .filter((topic) => topic.tier === tier.id)
      .map((topic) => {
        const topicPatterns = patternsByTopic(topic.id)
        return {
          topic,
          patterns: topicPatterns,
          questionCounts: Object.fromEntries(
            topicPatterns.map((pattern) => [pattern.id, questionsByPattern(pattern.id).length]),
          ),
        }
      })

    const tierPatterns = tierTopics.flatMap((entry) => entry.patterns)
    return {
      tier,
      topics: tierTopics,
      patternCount: tierPatterns.length,
      questionCount: tierPatterns.reduce((sum, p) => sum + questionsByPattern(p.id).length, 0),
    }
  })

  return (
    <div className="dsa-map">
      <header className="dsa-map-hero">
        <p className="dsa-map-eyebrow"><span>Roadmap</span> Data structures &amp; algorithms</p>
        <h1>Three tiers,<br />cumulative.</h1>
        <p className="dsa-map-scope">
          Tier 1 first, then Tier 2, then Tier 3 — and nothing below ever stops mattering.
          Open a topic to see its patterns, its sub-patterns, and the signal that should make
          you reach for it.
        </p>
        <dl className="dsa-map-stats">
          <div><dt>Tiers</dt><dd>3</dd></div>
          <div><dt>Topics</dt><dd>{topics.length}</dd></div>
          <div><dt>Patterns</dt><dd>{patterns.length}</dd></div>
          <div><dt>Questions</dt><dd>{questions.length}</dd></div>
        </dl>
      </header>

      <RoadmapTree tiers={nodes} />
    </div>
  )
}
