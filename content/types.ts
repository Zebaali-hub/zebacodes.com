/**
 * Domain model for the roadmap system.
 *
 * The decision that makes everything else possible: a TopicRef can point
 * into ANOTHER roadmap. Dependencies, next steps and relationships all use
 * it, so "Java ExecutorService → Spring @Async → HLD concurrency" is one
 * traversal rather than three disconnected documents.
 *
 * Nothing here imports from features/ or components/. Content is data.
 */

export type RoadmapId = 'dsa' | 'java' | 'spring' | 'database' | 'lld' | 'hld'
export type TierLevel = 1 | 2 | 3

/** A pointer to a topic in any roadmap. The cross-roadmap graph in one type. */
export type TopicRef = { roadmap: RoadmapId; topic: string }

export type RelationshipKind =
  | 'requires'    // you need that before this makes sense
  | 'enables'     // this unlocks that
  | 'implements'  // this is that idea realised at another layer
  | 'contrasts'   // solves a related problem differently — know the difference

/** Edges are annotated. A line without a reason is decoration. */
export type Relationship = {
  to: TopicRef
  kind: RelationshipKind
  why: string
}

/** How far a topic needs to be taken for an SDE-2 loop. */
export type Depth = 'awareness' | 'working' | 'deep'

export type InterviewQuestion = {
  q: string
  /** What a strong answer actually contains — not the answer itself. */
  expects: string
}

export type Exercise = {
  title: string
  detail: string
  /** Optional signature or skeleton — never a full solution. */
  sketch?: string
}

/**
 * The Practice block. Present ONLY where writing code is part of mastery
 * (Java, Spring, DSA). Absent for JVM internals, GC theory, HLD concepts —
 * where a coding tab would be padding. The panel hides the tab when this
 * is undefined rather than showing an empty section.
 */
export type Practice = {
  intent: string
  exercises: Exercise[]
}

export type Topic = {
  id: string
  roadmap: RoadmapId
  tier: TierLevel
  title: string
  summary: string

  /* LEARN */
  whyItMatters: string
  whatToLearn: string[]
  dependencies: TopicRef[]
  nextSteps: TopicRef[]

  /* INTERVIEW */
  howDeep: Depth
  interviewQuestions: InterviewQuestion[]

  /* SYSTEM */
  systemContext?: string
  related: Relationship[]

  /* PRACTICE — conditional */
  practice?: Practice

  /**
   * DSA specialisation. Points into data/dsa/patterns, preserving the full
   * Pattern objects — recognition signals, brute-force smell, prerequisite
   * DAG, question ladders — rather than flattening them into whatToLearn.
   */
  patternIds?: string[]
}

export type Tier = {
  level: TierLevel
  title: string
  goal: string
  exitCriteria: string[]
  topics: Topic[]
}

export type Roadmap = {
  id: RoadmapId
  title: string
  scope: string
  /** Shown when a roadmap is listed but not yet authored. */
  status: 'published' | 'drafting' | 'planned'
  tiers: Tier[]
}

/* ── Panel modes ───────────────────────────────────────────── */

export const PANEL_MODES = ['learn', 'interview', 'system', 'practice'] as const
export type PanelMode = (typeof PANEL_MODES)[number]

export const MODE_LABELS: Record<PanelMode, string> = {
  learn: 'Learn',
  interview: 'Interview',
  system: 'System',
  practice: 'Practice',
}

/** Which tabs a topic actually offers. Practice appears only if authored. */
export function availableModes(topic: Topic): PanelMode[] {
  const modes: PanelMode[] = ['learn']
  if (topic.interviewQuestions.length > 0) modes.push('interview')
  if (topic.systemContext || topic.related.length > 0) modes.push('system')
  if (topic.practice) modes.push('practice')
  return modes
}

export const DEPTH_LABELS: Record<Depth, string> = {
  awareness: 'Know it exists',
  working: 'Use it confidently',
  deep: 'Explain it under follow-up',
}

export const RELATIONSHIP_LABELS: Record<RelationshipKind, string> = {
  requires: 'Requires',
  enables: 'Enables',
  implements: 'Same idea, another layer',
  contrasts: 'Related but different',
}

export function refKey(ref: TopicRef): string {
  return `${ref.roadmap}/${ref.topic}`
}
