import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Roadmap } from '@/data/roadmaps'
import { topics } from '@/data/dsa/topics'
import { patterns, patternsByTopic } from '@/data/dsa/patterns'
import { questions, questionsByPattern } from '@/data/dsa/questions'

/**
 * The DSA roadmap, joined to the depth underneath it.
 *
 * The eight published steps stay as the spine. What was missing is that
 * each step now resolves to its topics, its patterns and its questions,
 * so the roadmap is an entry point rather than a dead end.
 */
export function DsaRoadmap({ roadmap }: { roadmap: Roadmap }) {
  const authoredQuestions = questions.length

  const orphanTopics = topics.filter(
    (topic) => !topic.roadmapStepId && patternsByTopic(topic.id).length > 0,
  )

  return (
    <div className="dsa-map">
      <header className="dsa-map-hero">
        <p className="dsa-map-eyebrow">
          <span>{roadmap.status}</span> Data structures &amp; algorithms
        </p>
        <h1>{roadmap.title}</h1>
        <p className="dsa-map-scope">{roadmap.scope}</p>
        <dl className="dsa-map-stats">
          <div><dt>Stages</dt><dd>{roadmap.steps.length}</dd></div>
          <div><dt>Patterns</dt><dd>{patterns.length}</dd></div>
          <div><dt>Questions</dt><dd>{authoredQuestions}</dd></div>
        </dl>
        <p className="dsa-map-note">
          Each stage below opens into its patterns. A pattern page leads with the constraint shapes
          and problem wording that should make you reach for it — recognition first, definitions last.
        </p>
        <Link className="dsa-map-cta" href="/roadmaps/dsa/patterns">
          Browse all patterns <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </header>

      <ol className="dsa-stage-list">
        {roadmap.steps.map((step, index) => {
          const stageTopics = topics.filter((topic) => topic.roadmapStepId === step.id)
          const stagePatterns = stageTopics.flatMap((topic) => patternsByTopic(topic.id))
          const stageQuestions = stagePatterns.reduce(
            (sum, pattern) => sum + questionsByPattern(pattern.id).length, 0,
          )

          return (
            <li key={step.id} className="dsa-stage">
              <div className="dsa-stage-rail" aria-hidden="true">
                <span className="dsa-stage-num">{String(index + 1).padStart(2, '0')}</span>
                {index < roadmap.steps.length - 1 ? <i className="dsa-stage-line" /> : null}
              </div>

              <div className="dsa-stage-body">
                <div className="dsa-stage-head">
                  <h2>{step.title}</h2>
                  <span className="dsa-chip" data-priority={step.priority}>{step.priority}</span>
                  {stagePatterns.length > 0 ? (
                    <span className="dsa-stage-count">
                      {stagePatterns.length} pattern{stagePatterns.length === 1 ? '' : 's'}
                      {stageQuestions > 0 ? ` · ${stageQuestions} question${stageQuestions === 1 ? '' : 's'}` : ''}
                    </span>
                  ) : null}
                </div>
                <p className="dsa-stage-summary">{step.summary}</p>

                {stageTopics.length === 0 ? (
                  <p className="dsa-stage-pending">No depth authored for this stage yet.</p>
                ) : (
                  <div className="dsa-stage-topics">
                    {stageTopics.map((topic) => {
                      const topicPatterns = patternsByTopic(topic.id)
                      return (
                        <div key={topic.id} className="dsa-stage-topic">
                          <h3>{topic.title}</h3>
                          {topicPatterns.length === 0 ? (
                            <p className="dsa-stage-pending">Patterns pending.</p>
                          ) : (
                            <ul>
                              {topicPatterns.map((pattern) => {
                                const count = questionsByPattern(pattern.id).length
                                return (
                                  <li key={pattern.id}>
                                    <Link href={`/roadmaps/dsa/patterns/${pattern.id}`}>
                                      {pattern.title}
                                      {count > 0 ? <em>{count}</em> : null}
                                      <ArrowUpRight size={11} aria-hidden="true" />
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {orphanTopics.length > 0 ? (
        <section className="dsa-orphans">
          <h2>Beyond the published path</h2>
          <p>
            These carry patterns but map to no stage above — the published path does not cover them yet.
            Left visible rather than forced into a stage where they do not belong.
          </p>
          <div className="dsa-stage-topics">
            {orphanTopics.map((topic) => (
              <div key={topic.id} className="dsa-stage-topic">
                <h3>{topic.title}</h3>
                <ul>
                  {patternsByTopic(topic.id).map((pattern) => {
                    const count = questionsByPattern(pattern.id).length
                    return (
                      <li key={pattern.id}>
                        <Link href={`/roadmaps/dsa/patterns/${pattern.id}`}>
                          {pattern.title}
                          {count > 0 ? <em>{count}</em> : null}
                          <ArrowUpRight size={11} aria-hidden="true" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
