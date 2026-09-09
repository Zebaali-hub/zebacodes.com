import type { Pattern } from '@/data/dsa/types'
import type { Depth, PanelMode, RelationshipKind, RoadmapId, Tier, Topic } from '@/content/types'

/**
 * View models passed from the server page to the client explorer.
 *
 * The current roadmap ships in full so selection is instant. Every OTHER
 * roadmap ships only as a light index — enough for search results and
 * cross-roadmap links, without bundling six roadmaps of prose into one
 * page. Following a cross-roadmap link is a real navigation that carries
 * the selection in the URL.
 */

export type EdgeView = {
  roadmap: RoadmapId
  roadmapTitle: string
  slug: string
  topic: string
  title: string
  tier: 1 | 2 | 3
  kind: RelationshipKind | 'depends' | 'next'
  why?: string
  crossRoadmap: boolean
}

export type PatternView = Pick<
  Pattern,
  'id' | 'title' | 'purpose' | 'subPatterns' | 'recognitionSignals' | 'bruteForceSmell' |
  'whyItWorks' | 'whenNotToUse' | 'commonMistakes' | 'typicalTC' | 'typicalSC' | 'googlePriority'
> & { questionCount: number }

export type TopicView = {
  id: string
  title: string
  summary: string
  tier: 1 | 2 | 3
  howDeep: Depth
  modes: PanelMode[]
  whyItMatters: string
  whatToLearn: string[]
  interviewQuestions: { q: string; expects: string }[]
  systemContext?: string
  practice?: { intent: string; exercises: { title: string; detail: string; sketch?: string }[] }
  edges: EdgeView[]
  patterns: PatternView[]
}

export type TierView = {
  level: 1 | 2 | 3
  title: string
  goal: string
  exitCriteria: string[]
  topics: TopicView[]
}

export type RoadmapView = {
  id: RoadmapId
  slug: string
  title: string
  scope: string
  status: 'published' | 'drafting' | 'planned'
  tiers: TierView[]
  counts: { topics: number; connections: number }
}

export type IndexEntry = {
  roadmap: RoadmapId
  slug: string
  roadmapTitle: string
  topic: string
  title: string
  tier: 1 | 2 | 3
  summary: string
}

export type { Tier, Topic }
