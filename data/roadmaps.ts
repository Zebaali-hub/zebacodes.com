export type RoadmapStep = {
  id: string
  title: string
  summary: string
  status: 'planned' | 'draft' | 'ready'
  prerequisites: string[]
  writingSlugs: string[]
  resourceUrls: string[]
}

export type Roadmap = {
  slug: string
  title: string
  scope: string
  status: 'planned' | 'in-progress' | 'published'
  steps: RoadmapStep[]
}

export const roadmaps: Roadmap[] = [
  ['dsa', 'DSA', 'Patterns, reasoning, and deliberate practice'],
  ['java', 'Java', 'Language mechanics through backend relevance'],
  ['spring-boot', 'Spring Boot', 'Application design and production behavior'],
  ['database', 'Database', 'SQL, internals, concurrency, and performance'],
  ['system-design', 'System Design', 'Requirements, trade-offs, and failure'],
  ['backend-engineering', 'Backend Engineering', 'A connected path across runtime, data, systems, and operations'],
].map(([slug, title, scope]) => ({ slug, title, scope, status: 'planned', steps: [] }))

export function getRoadmap(slug: string) {
  return roadmaps.find((roadmap) => roadmap.slug === slug)
}
