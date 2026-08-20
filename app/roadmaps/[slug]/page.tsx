import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, GitBranch, Link2 } from 'lucide-react'
import { getRoadmap, roadmaps } from '@/data/roadmaps'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return roadmaps.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const roadmap = getRoadmap((await params).slug); return roadmap ? { title: `${roadmap.title} Roadmap`, description: roadmap.scope, alternates: { canonical: `/roadmaps/${roadmap.slug}` } } : {} }

export default async function RoadmapPage({ params }: Props) {
  const roadmap = getRoadmap((await params).slug)
  if (!roadmap) notFound()
  return <div className="roadmap-detail"><div className="roadmap-shell"><Link className="roadmap-back" href="/roadmaps"><ArrowLeft size={15} /> All roadmaps</Link><header><p><span>{roadmap.status}</span> Roadmap framework</p><h1>{roadmap.title}</h1><strong>{roadmap.scope}</strong></header><div className="roadmap-canvas"><div className="roadmap-axis" aria-hidden="true" /><div className="roadmap-empty"><GitBranch size={28} /><h2>Editorial review in progress</h2><p>No learning steps have been published yet. This page is prepared for ordered topics, prerequisites, status, related writing, and repository resources.</p><div><span><Link2 size={14} /> prerequisites</span><span><BookOpen size={14} /> related writing</span><span><GitBranch size={14} /> GitHub resources</span></div></div></div></div></div>
}
