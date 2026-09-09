import { roadmaps, allTopics } from '@/content/roadmaps'
import { availableModes, type RoadmapId, type Topic } from '@/content/types'
import { edgesFrom, edgesTo } from '@/lib/content/graph'
import { getPattern } from '@/data/dsa/patterns'
import { questionsByPattern } from '@/data/dsa/questions'
import type { EdgeView, IndexEntry, PatternView, RoadmapView, TopicView } from './model'

/**
 * Route slugs. The published site already links /roadmaps/spring-boot and
 * /roadmaps/system-design, so those URLs keep working while the content
 * model uses shorter ids internally.
 */
export const SLUGS: Record<RoadmapId, string> = {
  dsa: 'dsa',
  java: 'java',
  spring: 'spring-boot',
  database: 'database',
  hld: 'system-design',
  lld: 'lld',
}

const BY_SLUG = Object.fromEntries(Object.entries(SLUGS).map(([id, slug]) => [slug, id as RoadmapId]))

export function roadmapIdForSlug(slug: string): RoadmapId | undefined {
  return BY_SLUG[slug] ?? (slug in SLUGS ? (slug as RoadmapId) : undefined)
}

const TITLES = Object.fromEntries(roadmaps.map((r) => [r.id, r.title])) as Record<RoadmapId, string>

function toEdgeView(edge: { topic: Topic; kind: EdgeView['kind']; why?: string }, from: RoadmapId): EdgeView {
  return {
    roadmap: edge.topic.roadmap,
    roadmapTitle: TITLES[edge.topic.roadmap],
    slug: SLUGS[edge.topic.roadmap],
    topic: edge.topic.id,
    title: edge.topic.title,
    tier: edge.topic.tier,
    kind: edge.kind,
    why: edge.why,
    crossRoadmap: edge.topic.roadmap !== from,
  }
}

function toPatternView(id: string): PatternView | null {
  const pattern = getPattern(id)
  if (!pattern) return null
  return {
    id: pattern.id,
    title: pattern.title,
    purpose: pattern.purpose,
    subPatterns: pattern.subPatterns,
    recognitionSignals: pattern.recognitionSignals,
    bruteForceSmell: pattern.bruteForceSmell,
    whyItWorks: pattern.whyItWorks,
    whenNotToUse: pattern.whenNotToUse,
    commonMistakes: pattern.commonMistakes,
    typicalTC: pattern.typicalTC,
    typicalSC: pattern.typicalSC,
    googlePriority: pattern.googlePriority,
    questionCount: questionsByPattern(pattern.id).length,
  }
}

function toTopicView(topic: Topic): TopicView {
  // One card per target topic. A pair is often BOTH a dependency and an
  // annotated relationship; showing it twice reads as a bug, so the
  // annotated edge wins because it carries the explanation.
  const byTarget = new Map<string, EdgeView>()
  for (const raw of [...edgesFrom(topic), ...edgesTo(topic)]) {
    const view = toEdgeView(raw, topic.roadmap)
    const key = `${view.roadmap}/${view.topic}`
    const existing = byTarget.get(key)
    if (!existing || (!existing.why && view.why)) byTarget.set(key, view)
  }
  const edges = [...byTarget.values()]
    // Cross-roadmap connections first — they are the point of the graph.
    .sort((a, b) => Number(b.crossRoadmap) - Number(a.crossRoadmap))

  return {
    id: topic.id,
    title: topic.title,
    summary: topic.summary,
    tier: topic.tier,
    howDeep: topic.howDeep,
    modes: availableModes(topic),
    whyItMatters: topic.whyItMatters,
    whatToLearn: topic.whatToLearn,
    interviewQuestions: topic.interviewQuestions,
    systemContext: topic.systemContext,
    practice: topic.practice,
    edges,
    patterns: (topic.patternIds ?? []).map(toPatternView).filter((p): p is PatternView => p !== null),
  }
}

export function buildRoadmapView(id: RoadmapId): RoadmapView | undefined {
  const roadmap = roadmaps.find((r) => r.id === id)
  if (!roadmap) return undefined

  const tiers = roadmap.tiers.map((tier) => ({
    level: tier.level,
    title: tier.title,
    goal: tier.goal,
    exitCriteria: tier.exitCriteria,
    topics: tier.topics.map(toTopicView),
  }))

  const topics = tiers.reduce((n, t) => n + t.topics.length, 0)
  const connections = tiers.reduce(
    (n, t) => n + t.topics.reduce((m, x) => m + x.edges.filter((e) => e.crossRoadmap).length, 0), 0,
  )

  return { id: roadmap.id, slug: SLUGS[roadmap.id], title: roadmap.title, scope: roadmap.scope, status: roadmap.status, tiers, counts: { topics, connections } }
}

/** Light index of every topic — powers search and cross-roadmap links. */
export function buildIndex(): IndexEntry[] {
  return allTopics.map((topic) => ({
    roadmap: topic.roadmap,
    slug: SLUGS[topic.roadmap],
    roadmapTitle: TITLES[topic.roadmap],
    topic: topic.id,
    title: topic.title,
    tier: topic.tier,
    summary: topic.summary,
  }))
}

export function roadmapNav() {
  return roadmaps.map((r) => ({ id: r.id, slug: SLUGS[r.id], title: r.title, status: r.status }))
}
