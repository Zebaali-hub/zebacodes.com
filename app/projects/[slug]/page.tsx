import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProject, projects } from '@/data/portfolio'
import { ProjectVisual } from '@/components/visualizations/ProjectVisual'
import { PageEnvironment } from '@/components/ui/PageEnvironment'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return projects.map(({ id }) => ({ slug: id })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const project = getProject((await params).slug); return project ? { title: `${project.name} Case Study`, description: project.summary, alternates: { canonical: `/projects/${project.id}` } } : {} }

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  return <div className={`experience-page case-study case-${project.visual}`}><PageEnvironment tone="systems" /><Link href="/projects" className="experience-back"><ArrowLeft size={16} /> Systems exhibition</Link><header className="case-hero"><p>{project.eyebrow}</p><h1>{project.name}</h1><strong>{project.summary}</strong><div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></header><section className="case-visual-stage"><ProjectVisual type={project.visual} /></section><div className="case-narrative"><section><span>01 / Problem</span><h2>The constraint.</h2><p>{project.problem}</p></section><section><span>02 / Architecture</span><h2>How it is shaped.</h2><p>{project.architecture}</p></section><section><span>03 / How it works</span><h2>Decisions made explicit.</h2><ul>{project.decisions.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span>04 / Failure thinking</span><h2>Where it can break.</h2><p>{project.failures}</p></section><section><span>05 / Reflection</span><h2>What I learned.</h2><p>{project.learned}</p></section></div><a className="case-repository" href={project.href} target="_blank" rel="noreferrer"><span>Inspect the source</span><strong>{project.name} on GitHub</strong><ArrowUpRight /></a></div>
}
