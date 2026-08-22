import type { Metadata } from 'next'
import { roadmaps } from '@/data/roadmaps'
import { PageEnvironment } from '@/components/ui/PageEnvironment'
import { RoadmapLandingGraph } from '@/components/RoadmapGraph'

export const metadata: Metadata = { title: 'Roadmaps', description: 'Curated backend engineering learning roadmaps by Zeba Ali.', alternates: { canonical: '/roadmaps' } }

export default function RoadmapsPage() {
  return <div className="experience-page roadmaps-experience"><PageEnvironment tone="map" /><header className="experience-hero"><p><span>R</span> Learning architecture</p><h1>Knowledge<br /><em>has structure.</em></h1><strong>What should I learn, in what order, and what depends on what?</strong><p>These maps are prepared for reviewed topics, prerequisites, practice, related writing, and next steps. No curriculum is published before technical review.</p></header><RoadmapLandingGraph roadmaps={roadmaps} /></div>
}
