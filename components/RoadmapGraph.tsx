'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Roadmap } from '@/data/roadmaps'

export function RoadmapLandingGraph({ roadmaps }: { roadmaps: Roadmap[] }) {
  const [active, setActive] = useState(roadmaps[0].slug)
  const selected = roadmaps.find((item) => item.slug === active) ?? roadmaps[0]
  return <div className="knowledge-map"><svg viewBox="0 0 1000 520" aria-hidden="true"><path d="M500 260 L170 110 M500 260 L500 75 M500 260 L825 120 M500 260 L190 420 M500 260 L500 455 M500 260 L820 410" /><circle cx="500" cy="260" r="7" /></svg><div className="map-core"><span>Choose a path</span><strong>{selected.title}</strong><p>{selected.scope}</p><Link href={`/roadmaps/${selected.slug}`}>Open map <ArrowUpRight size={15} /></Link></div>{roadmaps.map((roadmap, index) => <button key={roadmap.slug} className={`map-domain domain-${index + 1} ${active === roadmap.slug ? 'active' : ''}`} onMouseEnter={() => setActive(roadmap.slug)} onFocus={() => setActive(roadmap.slug)} onClick={() => setActive(roadmap.slug)}><span>0{index + 1}</span><strong>{roadmap.title}</strong><small>{roadmap.status}</small></button>)}</div>
}

export function RoadmapFramework({ roadmap }: { roadmap: Roadmap }) {
  const [active, setActive] = useState(roadmap.steps[0].id)
  const selected = roadmap.steps.find((item) => item.id === active) ?? roadmap.steps[0]
  return <div className="roadmap-path"><div className="roadmap-step-list" aria-label={`${roadmap.title} learning order`}>{roadmap.steps.map((item, index) => <button key={item.id} className={item.id === active ? 'active' : ''} onClick={() => setActive(item.id)} onFocus={() => setActive(item.id)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.title}</strong><small>{item.priority}</small></button>)}</div><article className="roadmap-step-panel" aria-live="polite"><span>{selected.priority} · current topic</span><h2>{selected.title}</h2><p>{selected.summary}</p><dl><div><dt>Prerequisite</dt><dd>{selected.prerequisites.join(', ') || 'Start here'}</dd></div><div><dt>Next step</dt><dd>{selected.nextStep}</dd></div></dl>{selected.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">{resource.kind}: {resource.label} <ArrowUpRight size={14} /></a>)}</article></div>
}
