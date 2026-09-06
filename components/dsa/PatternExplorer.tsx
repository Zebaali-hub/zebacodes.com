import Link from 'next/link'
import { ArrowUpRight, CircleAlert, Lightbulb, Target, TriangleAlert } from 'lucide-react'
import type { Pattern, Question, Topic } from '@/data/dsa/types'
import { getPattern } from '@/data/dsa/patterns'
import { QuestionLadder } from './QuestionLadder'

type Props = {
  pattern: Pattern
  topic?: Topic
  questions: Question[]
  prerequisites: Pattern[]
  unlocks: Pattern[]
}

/**
 * Section order is deliberate and is the pedagogical claim of this page:
 * recognition first, then the brute force and why it fails, then the
 * invariant, then when NOT to reach for it. Definitions come last,
 * because they are the part that was never hard.
 */
export function PatternExplorer({ pattern, topic, questions, prerequisites, unlocks }: Props) {
  return (
    <article className="dsa-pattern">
      <header className="dsa-hero">
        <p className="dsa-eyebrow">
          <span className="dsa-chip" data-tier={pattern.tier}>Tier {pattern.tier}</span>
          {topic ? <span>{topic.title}</span> : null}
          {pattern.googlePriority ? <span className="dsa-flag">Google priority</span> : null}
        </p>
        <h1>{pattern.title}</h1>
        <p className="dsa-lead">{pattern.purpose}</p>
        {pattern.subPatterns.length > 0 ? (
          <ul className="dsa-subpatterns">
            {pattern.subPatterns.map((sub) => <li key={sub}>{sub}</li>)}
          </ul>
        ) : null}
      </header>

      <section className="dsa-section dsa-signals">
        <h2><Target size={16} aria-hidden="true" /> When should I think of this?</h2>
        <p className="dsa-section-note">The interview skill is noticing these before you know the answer.</p>
        <ul>{pattern.recognitionSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
      </section>

      <div className="dsa-reasoning">
        <section className="dsa-section">
          <h2>The brute force, and its smell</h2>
          <p>{pattern.bruteForceSmell}</p>
        </section>
        <section className="dsa-section">
          <h2><Lightbulb size={16} aria-hidden="true" /> Why the optimisation works</h2>
          <p>{pattern.whyItWorks}</p>
        </section>
      </div>

      <section className="dsa-section dsa-warn">
        <h2><TriangleAlert size={16} aria-hidden="true" /> When NOT to use it</h2>
        <p className="dsa-section-note">The mirror of recognition, and the section most roadmaps leave out.</p>
        <ul>{pattern.whenNotToUse.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="dsa-section">
        <h2><CircleAlert size={16} aria-hidden="true" /> Common mistakes</h2>
        <ul className="dsa-mistakes">{pattern.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="dsa-section dsa-complexity">
        <h2>Complexity profile</h2>
        <dl>
          <div><dt>Time</dt><dd>{pattern.typicalTC}</dd></div>
          <div><dt>Space</dt><dd>{pattern.typicalSC}</dd></div>
        </dl>
      </section>

      <section className="dsa-section dsa-graph">
        <h2>Prerequisites and what this unlocks</h2>
        <div className="dsa-graph-cols">
          <div>
            <h3>Learn first</h3>
            {prerequisites.length > 0 ? (
              <ul>{prerequisites.map((p) => (
                <li key={p.id}><Link href={`/roadmaps/dsa/patterns/${p.id}`}>{p.title} <ArrowUpRight size={12} aria-hidden="true" /></Link></li>
              ))}</ul>
            ) : <p className="dsa-empty">Nothing — this is an entry point.</p>}
          </div>
          <div>
            <h3>This unlocks</h3>
            {unlocks.length > 0 ? (
              <ul>{unlocks.map((p) => (
                <li key={p.id}><Link href={`/roadmaps/dsa/patterns/${p.id}`}>{p.title} <ArrowUpRight size={12} aria-hidden="true" /></Link></li>
              ))}</ul>
            ) : <p className="dsa-empty">Nothing yet in the authored set.</p>}
          </div>
          <div>
            <h3>Combines with</h3>
            {pattern.combinesWith.length > 0 ? (
              <ul>{pattern.combinesWith.map((id) => {
                const related = getPattern(id)
                // Ids without a Pattern yet are the declared PLANNED set —
                // shown as pending rather than as a broken link.
                return (
                  <li key={id}>
                    {related
                      ? <Link href={`/roadmaps/dsa/patterns/${related.id}`}>{related.title} <ArrowUpRight size={12} aria-hidden="true" /></Link>
                      : <span className="dsa-combines">{id.replace(/-/g, ' ')} <em>planned</em></span>}
                  </li>
                )
              })}</ul>
            ) : <p className="dsa-empty">Used alone.</p>}
          </div>
        </div>
      </section>

      <QuestionLadder questions={questions} patternTitle={pattern.title} />
    </article>
  )
}
