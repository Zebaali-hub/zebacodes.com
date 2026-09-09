'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import type { PanelMode } from '@/content/types'
import type { IndexEntry, RoadmapView, TopicView } from './model'
import { DetailPanel } from './DetailPanel'
import { CommandBar } from './CommandBar'

type Density = 'engineer' | 'recruiter'

export function RoadmapExplorer({
  roadmap, index, nav,
}: {
  roadmap: RoadmapView
  index: IndexEntry[]
  nav: { id: string; slug: string; title: string; status: string }[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const selectedId = params.get('topic')

  const [mode, setMode] = useState<PanelMode>('learn')
  const [density, setDensity] = useState<Density>('engineer')
  const [openTiers, setOpenTiers] = useState<Set<number>>(new Set([1]))

  const byId = useMemo(() => {
    const map = new Map<string, TopicView>()
    for (const tier of roadmap.tiers) for (const t of tier.topics) map.set(t.id, t)
    return map
  }, [roadmap])

  const selected = selectedId ? byId.get(selectedId) : undefined

  // A selection arriving from another roadmap must open its tier. Derived
  // rather than pushed through an effect, so there is no cascading render.
  const visibleTiers = useMemo(() => {
    const set = new Set(openTiers)
    if (selected) set.add(selected.tier)
    return set
  }, [openTiers, selected])

  const select = useCallback((id: string | null) => {
    const next = new URLSearchParams(Array.from(params.entries()))
    if (id) next.set('topic', id)
    else next.delete('topic')
    router.replace(`${pathname}${next.toString() ? `?${next}` : ''}`, { scroll: false })
  }, [params, pathname, router])

  const toggleTier = (level: number) =>
    setOpenTiers((prev) => {
      const next = new Set(prev)
      if (next.has(level)) next.delete(level)
      else next.add(level)
      return next
    })

  return (
    <div className="ws rx" data-density={density} data-panel={selected ? 'open' : 'closed'}>
      <nav className="rx-rail" aria-label="Roadmaps">
        <span className="rx-rail-label m" aria-hidden="true">RM</span>
        <ul>
          {nav.map((item, i) => (
            <li key={item.id}>
              <Link href={`/roadmaps/${item.slug}`} className={item.slug === roadmap.slug ? 'is-current' : ''}
                aria-current={item.slug === roadmap.slug ? 'page' : undefined}>
                <span className="m">{String(i + 1).padStart(2, '0')}</span>
                <em>{item.title}</em>
              </Link>
            </li>
          ))}
        </ul>
        <button type="button" className="rx-density"
          onClick={() => setDensity((d) => (d === 'engineer' ? 'recruiter' : 'engineer'))}
          aria-label={`Switch to ${density === 'engineer' ? 'recruiter' : 'engineer'} view`}>
          <span className="m">{density === 'engineer' ? 'ENG' : 'REC'}</span>
        </button>
      </nav>

      <div className="rx-canvas">
        <header className="rx-head">
          <div>
            <p className="rx-eyebrow m">
              <span>{roadmap.title}</span>
              {roadmap.status !== 'published' ? <b className="rx-status">{roadmap.status}</b> : null}
            </p>
            <h1>{roadmap.scope}</h1>
            <p className="rx-counts m">
              {roadmap.counts.topics} topics · {roadmap.counts.connections} cross-roadmap connections
            </p>
          </div>
          <CommandBar index={index} />
        </header>

        {roadmap.tiers.map((tier) => {
          const open = visibleTiers.has(tier.level)
          if (tier.topics.length === 0) return null
          return (
            <section key={tier.level} className="rx-tier" data-tier={tier.level}>
              <button type="button" className="rx-tier-head" onClick={() => toggleTier(tier.level)} aria-expanded={open}>
                <ChevronRight className="rx-caret" size={18} aria-hidden="true" />
                <span className="rx-tier-badge m">Tier {tier.level}</span>
                <span className="rx-tier-title">{tier.title}</span>
                <span className="rx-tier-count m">{tier.topics.length}</span>
              </button>

              {open ? (
                <div className="rx-tier-body">
                  <p className="rx-goal" data-depth-only>{tier.goal}</p>
                  {tier.exitCriteria.length > 0 ? (
                    <ul className="rx-exit" data-depth-only>
                      {tier.exitCriteria.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  ) : null}
                  <ul className="rx-topics">
                    {tier.topics.map((topic) => {
                      const isSelected = topic.id === selectedId
                      const crossCount = topic.edges.filter((e) => e.crossRoadmap).length
                      return (
                        <li key={topic.id}>
                          <button type="button" className={`rx-topic ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => select(isSelected ? null : topic.id)} aria-pressed={isSelected}>
                            <span className="rx-topic-title">{topic.title}</span>
                            <span className="rx-topic-summary" data-depth-only>{topic.summary}</span>
                            <span className="rx-topic-meta m">
                              {topic.patterns.length > 0 ? <b>{topic.patterns.length}P</b> : null}
                              {crossCount > 0 ? <b className="rx-link-count">{crossCount}↔</b> : null}
                              <i>{topic.howDeep}</i>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}
            </section>
          )
        })}
      </div>

      {selected ? (
        <DetailPanel topic={selected} mode={mode} onMode={setMode}
          onClose={() => select(null)} roadmapTitle={roadmap.title} />
      ) : null}
    </div>
  )
}
