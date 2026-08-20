import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Route } from 'lucide-react'
import { roadmaps } from '@/data/roadmaps'

export const metadata: Metadata = { title: 'Roadmaps', description: 'Curated backend engineering learning roadmaps by Zeba Ali.', alternates: { canonical: '/roadmaps' } }

export default function RoadmapsPage() {
  return <div className="roadmaps-page"><div className="roadmap-shell"><header><p><span>R</span> Learning architecture</p><h1>Roadmaps</h1><strong>What should I learn, and in what order?</strong><p>Each roadmap will connect prerequisites, focused writing, and practical GitHub resources. The structure is ready; educational steps will be published only after technical review.</p></header><div className="roadmap-grid">{roadmaps.map((roadmap, i) => <Link key={roadmap.slug} href={`/roadmaps/${roadmap.slug}`}><span>0{i + 1}</span><Route size={19} /><small>{roadmap.status}</small><h2>{roadmap.title}</h2><p>{roadmap.scope}</p><em>Open framework <ArrowUpRight size={14} /></em></Link>)}</div></div></div>
}
