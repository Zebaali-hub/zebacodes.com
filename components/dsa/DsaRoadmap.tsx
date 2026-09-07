import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { tiers } from '@/data/dsa/tiers'
import { topics } from '@/data/dsa/topics'
import { patterns, patternsByTopic } from '@/data/dsa/patterns'
import { questions, questionsByPattern } from '@/data/dsa/questions'

/**
 * The DSA roadmap, organised by TIER — the cumulative structure the
 * curriculum is actually built on. Tier 2 does not replace Tier 1 and
 * Tier 3 does not replace Tier 2, so the page reads downward as
 * accumulating depth rather than as alternative tracks.
 */
export function DsaRoadmap() {
  return (
    <div className="dsa-map">
      <header className="dsa-map-hero">
        <p className="dsa-map-eyebrow"><span>Roadmap</span> Data structures &amp; algorithms</p>
        <h1>Three tiers,<br />cumulative.</h1>
        <p className="dsa-map-scope">
          Tier 2 does not replace Tier 1, and Tier 3 does not replace Tier 2. Preparing for the top of
          this map still means owning everything below it.
        </p>
        <dl className="dsa-map-stats">
          <div><dt>Tiers</dt><dd>3</dd></div>
          <div><dt>Topics</dt><dd>{topics.length}</dd></div>
          <div><dt>Patterns</dt><dd>{patterns.length}</dd></div>
          <div><dt>Questions</dt><dd>{questions.length}</dd></div>
        </dl>
        <Link className="dsa-map-cta" href="/roadmaps/dsa/patterns">
          Browse all patterns <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </header>

      <div className="dsa-tiers">
        {tiers.map((tier) => {
          const tierTopics = topics.filter((topic) => topic.tier === tier.id)
          const tierPatterns = patterns.filter((pattern) => pattern.tier === tier.id)
          const tierQuestions = tierPatterns.reduce(
            (sum, pattern) => sum + questionsByPattern(pattern.id).length, 0,
          )

          return (
            <section key={tier.id} className="dsa-tier" data-tier={tier.id} aria-labelledby={`tier-${tier.id}`}>
              <div className="dsa-tier-bar" aria-hidden="true" />

              <div className="dsa-tier-head">
                <p className="dsa-tier-index" aria-hidden="true">Tier {tier.id}</p>
                <div>
                  <h2 id={`tier-${tier.id}`}>{tier.title}</h2>
                  <p className="dsa-tier-goal">{tier.goal}</p>
                </div>
                <ul className="dsa-tier-stats" aria-label={`Tier ${tier.id} scale`}>
                  <li><b>{tierTopics.length}</b><span>topics</span></li>
                  <li><b>{tierPatterns.length}</b><span>patterns</span></li>
                  <li><b>{tierQuestions}</b><span>questions</span></li>
                  <li><b>{Math.round(tier.targetIndependentRate * 100)}%</b><span>target unaided</span></li>
                </ul>
              </div>

              <details className="dsa-tier-exit">
                <summary>Exit criteria — what leaving this tier requires</summary>
                <ol>{tier.exitCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ol>
              </details>

              <div className="dsa-topic-cards">
                {tierTopics.map((topic) => {
                  const topicPatterns = patternsByTopic(topic.id)
                  return (
                    <article key={topic.id} className={`dsa-topic-card ${topicPatterns.length === 0 ? 'is-pending' : ''}`}>
                      <h3>{topic.title}</h3>
                      <p>{topic.summary}</p>
                      {topicPatterns.length === 0 ? (
                        <p className="dsa-pending-note">Patterns not written yet</p>
                      ) : (
                        <ul>
                          {topicPatterns.map((pattern) => {
                            const count = questionsByPattern(pattern.id).length
                            return (
                              <li key={pattern.id}>
                                <Link href={`/roadmaps/dsa/patterns/${pattern.id}`}>
                                  {pattern.title}
                                  {count > 0 ? <em>{count}</em> : null}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
