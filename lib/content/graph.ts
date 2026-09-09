import { allTopics, resolveTopic, roadmaps } from '@/content/roadmaps'
import { refKey, type Relationship, type Topic, type TopicRef } from '@/content/types'

/**
 * Traversal and search over the cross-roadmap graph.
 * Pure functions over the content model — no React, no fetching.
 */

export type ResolvedEdge = {
  topic: Topic
  kind: Relationship['kind'] | 'depends' | 'next'
  why?: string
}

/** Every outgoing edge from a topic, resolved to real topics, deduplicated. */
export function edgesFrom(topic: Topic): ResolvedEdge[] {
  const out: ResolvedEdge[] = []
  const seen = new Set<string>()

  const push = (ref: TopicRef, kind: ResolvedEdge['kind'], why?: string) => {
    const key = `${refKey(ref)}:${kind}`
    if (seen.has(key)) return
    const resolved = resolveTopic(ref)
    if (!resolved) return
    seen.add(key)
    out.push({ topic: resolved, kind, why })
  }

  topic.dependencies.forEach((ref) => push(ref, 'depends'))
  topic.nextSteps.forEach((ref) => push(ref, 'next'))
  topic.related.forEach((rel) => push(rel.to, rel.kind, rel.why))
  return out
}

/** Topics that point AT this one. Derived, never authored twice. */
export function edgesTo(topic: Topic): ResolvedEdge[] {
  const target = { roadmap: topic.roadmap, topic: topic.id }
  const key = refKey(target)
  const out: ResolvedEdge[] = []

  for (const candidate of allTopics) {
    if (candidate === topic) continue
    if (candidate.dependencies.some((r) => refKey(r) === key)) out.push({ topic: candidate, kind: 'next' })
    else if (candidate.nextSteps.some((r) => refKey(r) === key)) out.push({ topic: candidate, kind: 'depends' })
    else {
      const rel = candidate.related.find((r) => refKey(r.to) === key)
      if (rel) out.push({ topic: candidate, kind: rel.kind, why: rel.why })
    }
  }
  return out
}

/** Edges that leave the topic's own roadmap — the connections worth surfacing. */
export function crossRoadmapEdges(topic: Topic): ResolvedEdge[] {
  return [...edgesFrom(topic), ...edgesTo(topic)].filter((e) => e.topic.roadmap !== topic.roadmap)
}

/** Every reference that fails to resolve. Should always be empty; the test asserts it. */
export function danglingRefs(): string[] {
  const bad: string[] = []
  for (const topic of allTopics) {
    const where = `${topic.roadmap}/${topic.id}`
    const check = (ref: TopicRef, field: string) => {
      if (!resolveTopic(ref)) bad.push(`${where} ${field} → ${refKey(ref)}`)
    }
    topic.dependencies.forEach((r) => check(r, 'dependencies'))
    topic.nextSteps.forEach((r) => check(r, 'nextSteps'))
    topic.related.forEach((r) => check(r.to, 'related'))
  }
  return bad
}

/* ── Search ────────────────────────────────────────────────── */

export type SearchHit = {
  topic: Topic
  score: number
  /** Breadcrumb: "Database → Tier 2 → MVCC" */
  path: string
}

const ROADMAP_TITLES = Object.fromEntries(roadmaps.map((r) => [r.id, r.title]))

/**
 * Structured retrieval. Deliberately not a vector index — the corpus is a
 * few hundred authored nodes, so deterministic scoring is faster, free, and
 * cannot hallucinate a match.
 */
export function search(query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const terms = q.split(/\s+/).filter(Boolean)

  const hits: SearchHit[] = []
  for (const topic of allTopics) {
    const title = topic.title.toLowerCase()
    const body = [topic.summary, topic.whyItMatters, ...topic.whatToLearn, topic.systemContext ?? '']
      .join(' ')
      .toLowerCase()

    let score = 0
    for (const term of terms) {
      if (title === term) score += 100
      else if (title.startsWith(term)) score += 60
      else if (title.includes(term)) score += 40
      if (topic.id.includes(term)) score += 30
      if (body.includes(term)) score += 8
    }
    if (score === 0) continue
    if (topic.tier === 1) score += 3 // gentle bias toward foundations

    hits.push({
      topic,
      score,
      path: `${ROADMAP_TITLES[topic.roadmap]} → Tier ${topic.tier} → ${topic.title}`,
    })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}

/**
 * "MVCC" should return the topic AND its connections across roadmaps —
 * the cross-roadmap intelligence, without a model in the loop.
 */
export function searchWithConnections(query: string) {
  const hits = search(query, 5)
  const primary = hits[0]
  return {
    hits,
    connections: primary ? crossRoadmapEdges(primary.topic) : [],
  }
}
