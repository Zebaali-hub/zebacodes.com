'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { ProjectVisual } from '@/components/visualizations/ProjectVisual'

export function FeaturedSystems() {
  const [open, setOpen] = useState('orderflow')
  return (
    <section className="section systems-section" id="systems">
      <div className="site-container section-heading">
        <p><span>03</span> Featured systems</p>
        <h2>Systems, not screenshots.</h2>
        <p className="heading-note">Five projects. Five different engineering problems. Every description below is grounded in the repository.</p>
      </div>
      <div className="site-container project-list">
        {projects.map((project, index) => {
          const expanded = open === project.id
          return (
            <article key={project.id} className={`project-case project-${project.visual} ${expanded ? 'is-open' : ''}`}>
              <button className="project-summary" onClick={() => setOpen(expanded ? '' : project.id)} aria-expanded={expanded} aria-controls={`${project.id}-details`}>
                <span className="project-number">0{index + 1}</span>
                <span><small>{project.eyebrow}</small><strong>{project.name}</strong><em>{project.summary}</em></span>
                <ChevronDown className="project-chevron" size={22} />
              </button>
              <div id={`${project.id}-details`} className="project-details" hidden={!expanded}>
                <ProjectVisual type={project.visual} />
                <div className="case-grid">
                  <div><h3>Problem</h3><p>{project.problem}</p></div>
                  <div><h3>Architecture</h3><p>{project.architecture}</p></div>
                  <div><h3>Engineering decisions</h3><ul>{project.decisions.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  <div><h3>Failure considerations</h3><p>{project.failures}</p></div>
                  <div><h3>What I learned</h3><p>{project.learned}</p></div>
                </div>
                <div className="case-footer"><div>{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={16} /></a></div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
