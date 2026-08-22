'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { ProjectVisual } from '@/components/visualizations/ProjectVisual'

export function ProjectExplorer() {
  const [active, setActive] = useState(projects[0].id)
  const project = projects.find((item) => item.id === active) ?? projects[0]
  return <div className="exhibition-layout">
    <nav className="exhibition-index" aria-label="Project exhibition">{projects.map((item, index) => <button key={item.id} className={item.id === active ? 'active' : ''} onClick={() => setActive(item.id)}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.eyebrow}</small></button>)}</nav>
    <article className="exhibition-stage">
      <header><p>{project.eyebrow}</p><h2>{project.name}</h2><strong>{project.summary}</strong></header>
      <ProjectVisual type={project.visual} />
      <div className="exhibition-facts"><div><span>System problem</span><p>{project.problem}</p></div><div><span>Architecture</span><p>{project.architecture}</p></div></div>
      <div className="exhibition-actions"><Link href={`/projects/${project.id}`}>Read case study <ArrowUpRight size={16} /></Link><a href={project.href} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={16} /></a></div>
    </article>
  </div>
}
