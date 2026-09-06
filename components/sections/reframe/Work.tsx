import { ArrowUpRight } from 'lucide-react'
import { featuredProjects } from '@/data/portfolio'
import { ArchitectureDiagram } from '@/components/architecture/ArchitectureDiagram'
import { ProjectShots } from '@/components/architecture/ProjectShots'

export function Work() {
  return (
    <section className="rf-work" id="projects" aria-labelledby="rf-work-heading">
      <div className="site-container">
        <p className="rf-positioning">
          I work on the layer most engineers never touch: how databases actually execute queries,
          and how vector indexes trade recall for latency at scale.
        </p>
        <h2 id="rf-work-heading" className="rf-section-title"><span>Projects</span></h2>
        <div className="rf-project-list">
          {featuredProjects.map((project, index) => (
            <article key={project.id} className="rf-project">
              <header>
                <span className="rf-project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{project.name}</h3>
                  <p className="rf-project-tagline">{project.tagline}</p>
                </div>
                <a className="rf-repo" href={project.href} target="_blank" rel="noreferrer">
                  Repository <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </header>

              {project.diagram ? <ArchitectureDiagram kind={project.diagram} /> : null}
              {project.assetDir ? <ProjectShots dir={project.assetDir} name={project.name} /> : null}

              <dl className="rf-pao">
                <div><dt>Problem</dt><dd>{project.problem}</dd></div>
                <div><dt>Approach</dt><dd>{project.approach}</dd></div>
                <div><dt>Outcome</dt><dd>{project.outcome}</dd></div>
              </dl>

              <ul className="rf-stack">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
