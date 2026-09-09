'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CornerDownRight, Target, X } from 'lucide-react'
import { MODE_LABELS, DEPTH_LABELS, RELATIONSHIP_LABELS, type PanelMode } from '@/content/types'
import type { EdgeView, TopicView } from './model'

const EDGE_LABEL: Record<EdgeView['kind'], string> = {
  ...RELATIONSHIP_LABELS,
  depends: 'Learn first',
  next: 'Then',
}

export function DetailPanel({
  topic, mode, onMode, onClose, roadmapTitle,
}: {
  topic: TopicView
  mode: PanelMode
  onMode: (m: PanelMode) => void
  onClose: () => void
  roadmapTitle: string
}) {
  const active = topic.modes.includes(mode) ? mode : topic.modes[0]
  const cross = useMemo(() => topic.edges.filter((e) => e.crossRoadmap), [topic])
  const within = useMemo(() => topic.edges.filter((e) => !e.crossRoadmap), [topic])

  return (
    <aside className="dp" aria-label={`${topic.title} detail`}>
      <header className="dp-head">
        <div className="dp-crumb m">
          <span data-tier={topic.tier}>Tier {topic.tier}</span>
          <span>{roadmapTitle}</span>
        </div>
        <h2>{topic.title}</h2>
        <p className="dp-summary">{topic.summary}</p>
        <button type="button" className="dp-close" onClick={onClose} aria-label="Close detail panel">
          <X size={17} aria-hidden="true" />
        </button>
      </header>

      <nav className="dp-modes" aria-label="Detail view">
        {topic.modes.map((m) => (
          <button key={m} type="button" className={m === active ? 'is-active' : ''}
            onClick={() => onMode(m)} aria-pressed={m === active}>
            {MODE_LABELS[m]}
          </button>
        ))}
      </nav>

      <div className="dp-body">
        {active === 'learn' ? (
          <>
            <Section title="Why it matters"><p>{topic.whyItMatters}</p></Section>
            {topic.whatToLearn.length > 0 ? (
              <Section title="What to learn">
                <ul className="dp-list">{topic.whatToLearn.map((x) => <li key={x}>{x}</li>)}</ul>
              </Section>
            ) : null}
            {topic.patterns.length > 0 ? <Patterns topic={topic} /> : null}
            {within.length > 0 ? <Edges title="In this roadmap" edges={within} /> : null}
          </>
        ) : null}

        {active === 'interview' ? (
          <>
            <Section title="Expected depth">
              <p className="dp-depth" data-depth={topic.howDeep}>
                <span className="m">{topic.howDeep}</span> — {DEPTH_LABELS[topic.howDeep]}
              </p>
            </Section>
            <Section title="Questions, and what a strong answer contains">
              <ol className="dp-questions">
                {topic.interviewQuestions.map((item) => (
                  <li key={item.q}>
                    <p className="dp-q">{item.q}</p>
                    <p className="dp-expects"><CornerDownRight size={13} aria-hidden="true" /> {item.expects}</p>
                  </li>
                ))}
              </ol>
            </Section>
          </>
        ) : null}

        {active === 'system' ? (
          <>
            {topic.systemContext ? (
              <Section title="How it shows up in a real backend"><p>{topic.systemContext}</p></Section>
            ) : null}
            {cross.length > 0 ? <Edges title="Connects across roadmaps" edges={cross} emphasis /> : null}
            {within.length > 0 ? <Edges title="In this roadmap" edges={within} /> : null}
          </>
        ) : null}

        {active === 'practice' && topic.practice ? (
          <>
            <Section title="Intent"><p>{topic.practice.intent}</p></Section>
            <Section title="Exercises">
              <ol className="dp-exercises">
                {topic.practice.exercises.map((ex) => (
                  <li key={ex.title}>
                    <h4>{ex.title}</h4>
                    <p>{ex.detail}</p>
                    {ex.sketch ? <pre className="m">{ex.sketch}</pre> : null}
                  </li>
                ))}
              </ol>
            </Section>
          </>
        ) : null}
      </div>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="dp-section">
      <h3 className="m">{title}</h3>
      {children}
    </section>
  )
}

function Edges({ title, edges, emphasis }: { title: string; edges: EdgeView[]; emphasis?: boolean }) {
  return (
    <section className={`dp-section ${emphasis ? 'dp-cross' : ''}`}>
      <h3 className="m">{title}</h3>
      <ul className="dp-edges">
        {edges.map((edge) => (
          <li key={`${edge.roadmap}/${edge.topic}/${edge.kind}`}>
            <Link href={`/roadmaps/${edge.slug}?topic=${edge.topic}`} className="dp-edge">
              <span className="dp-edge-kind m">{EDGE_LABEL[edge.kind]}</span>
              <span className="dp-edge-title">
                {edge.crossRoadmap ? <b className="m">{edge.roadmapTitle}</b> : null}
                {edge.title}
                <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </Link>
            {edge.why ? <p className="dp-why">{edge.why}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** DSA patterns render in full — recognition first, which is the point. */
function Patterns({ topic }: { topic: TopicView }) {
  return (
    <section className="dp-section">
      <h3 className="m">Patterns</h3>
      <div className="dp-patterns">
        {topic.patterns.map((p) => (
          <article key={p.id} className="dp-pattern">
            <header>
              <Link href={`/roadmaps/dsa/patterns/${p.id}`}>{p.title} <ArrowUpRight size={12} aria-hidden="true" /></Link>
              {p.questionCount > 0 ? <span className="dp-count m">{p.questionCount} Q</span> : null}
            </header>
            <p className="dp-purpose">{p.purpose}</p>
            {p.subPatterns.length > 0 ? (
              <ul className="dp-subs m">{p.subPatterns.map((s) => <li key={s}>{s}</li>)}</ul>
            ) : null}
            {p.recognitionSignals[0] ? (
              <p className="dp-signal">
                <Target size={13} aria-hidden="true" />
                <span><b>Recognise it when:</b> {p.recognitionSignals[0]}</span>
              </p>
            ) : null}
            <p className="dp-complexity m">{p.typicalTC} time · {p.typicalSC} space</p>
          </article>
        ))}
      </div>
    </section>
  )
}
