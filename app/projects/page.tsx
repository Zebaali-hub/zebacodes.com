import type { Metadata } from 'next'
import { PageEnvironment } from '@/components/ui/PageEnvironment'
import { ProjectExplorer } from '@/components/ProjectExplorer'

export const metadata: Metadata = { title: 'Engineering Systems', description: 'Explore verified backend systems built by Zeba Ali: event-driven services, database load tooling, diagnostics, and local-first products.', alternates: { canonical: '/projects' } }

export default function ProjectsPage() {
  return <div className="experience-page projects-experience"><PageEnvironment tone="systems" /><header className="experience-hero"><p><span>01</span> Systems exhibition</p><h1>Engineering<br /><em>in motion.</em></h1><strong>Five systems. Different constraints. One focus: making backend behavior explicit.</strong></header><ProjectExplorer /></div>
}
