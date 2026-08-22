'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, GitBranch, Link2, Target } from 'lucide-react'
import type { Roadmap } from '@/data/roadmaps'

const framework = [
  { id: 'prerequisite', label: 'Prerequisite', detail: 'What must be understood first.', icon: Link2 },
  { id: 'topic', label: 'Topic', detail: 'The concept currently in focus.', icon: Target },
  { id: 'practice', label: 'Practice', detail: 'Evidence that the concept can be applied.', icon: GitBranch },
  { id: 'writing', label: 'Related writing', detail: 'A deeper explanation when one is published.', icon: BookOpen },
]

export function RoadmapLandingGraph({ roadmaps }: { roadmaps: Roadmap[] }) {
  const [active, setActive] = useState(roadmaps[0].slug)
  const selected = roadmaps.find((item) => item.slug === active) ?? roadmaps[0]
  return <div className="knowledge-map"><svg viewBox="0 0 1000 520" aria-hidden="true"><path d="M500 260 L170 110 M500 260 L500 75 M500 260 L825 120 M500 260 L190 420 M500 260 L500 455 M500 260 L820 410" /><circle cx="500" cy="260" r="7" /></svg><div className="map-core"><span>Choose a path</span><strong>{selected.title}</strong><p>{selected.scope}</p><Link href={`/roadmaps/${selected.slug}`}>Open map <ArrowUpRight size={15} /></Link></div>{roadmaps.map((roadmap, index) => <button key={roadmap.slug} className={`map-domain domain-${index + 1} ${active === roadmap.slug ? 'active' : ''}`} onMouseEnter={() => setActive(roadmap.slug)} onFocus={() => setActive(roadmap.slug)} onClick={() => setActive(roadmap.slug)}><span>0{index + 1}</span><strong>{roadmap.title}</strong><small>{roadmap.status}</small></button>)}</div>
}

export function RoadmapFramework({ roadmap }: { roadmap: Roadmap }) {
  const [active, setActive] = useState(framework[1].id)
  const selected = framework.find((item) => item.id === active) ?? framework[1]
  return <div className="framework-map"><div className="framework-track" aria-hidden="true" />{framework.map(({ id, label, icon: Icon }, index) => <button key={id} className={`framework-node framework-${index + 1} ${id === active ? 'active' : ''}`} onClick={() => setActive(id)} onFocus={() => setActive(id)}><Icon size={18} /><span>{label}</span></button>)}<div className="framework-panel"><span>{roadmap.status} framework</span><h2>{selected.label}</h2><p>{selected.detail}</p><small>No educational steps are published until technical review is complete.</small></div></div>
}
