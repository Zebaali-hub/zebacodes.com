/**
 * Curriculum types for the interactive DSA roadmap.
 *
 * Two hard rules the rest of the system depends on:
 *
 *  1. CURRICULUM data (tiers, topics, patterns, questions) is static,
 *     version-controlled and immutable at runtime.
 *  2. PROGRESS data (attempts, mastery, revision) is user-owned, mutable,
 *     and reached only through the ProgressStore interface in lib/dsa/storage.
 *
 * Nothing in this file imports from lib/. The dependency runs one way.
 */

/* ── Curriculum ──────────────────────────────────────────── */

export type TierId = 1 | 2 | 3
export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type Priority = 'must' | 'should' | 'optional'

/**
 * Pedagogical role, deliberately decoupled from difficulty.
 * A Hard problem can be FOUNDATION for its pattern; an Easy one
 * can be an EXIT_TEST. Ordering the ladder by difficulty instead
 * of by role is the failure mode this type exists to prevent.
 */
export type Classification =
  | 'FOUNDATION'
  | 'CORE'
  | 'VARIATION'
  | 'ADVANCED'
  | 'COMBINATION'
  | 'EXIT_TEST'

export type Tier = {
  id: TierId
  slug: string
  title: string
  goal: string
  /** What the candidate must be able to do to leave this tier. */
  exitCriteria: string[]
  /** Independent-solve rate expected before moving on, 0–1. */
  targetIndependentRate: number
}

export type Topic = {
  id: string
  tier: TierId
  title: string
  summary: string
  /**
   * Joins this topic to a step in the already-published roadmap
   * (data/roadmaps.ts, slug 'dsa'). Several topics may share one
   * step. Undefined means the published path does not cover it.
   */
  roadmapStepId?: string
}

export type Pattern = {
  id: string
  topicId: string
  tier: TierId
  title: string
  /** One line: what this pattern is for. */
  purpose: string
  subPatterns: string[]
  /** Pattern ids that should be understood first. Forms a DAG. */
  prerequisites: string[]
  /** Constraint shapes and problem wording that should trigger it. */
  recognitionSignals: string[]
  /** The naive approach, and the operation that makes it too slow. */
  bruteForceSmell: string
  /** The invariant that makes the optimisation correct. */
  whyItWorks: string
  /** Cases where reaching for this pattern is the wrong instinct. */
  whenNotToUse: string[]
  commonMistakes: string[]
  typicalTC: string
  typicalSC: string
  /** Pattern ids frequently combined with this one. */
  combinesWith: string[]
  googlePriority: boolean
}

export type Question = {
  /** Stable internal id, e.g. 'lc-560'. */
  id: string
  /** Verified LeetCode problem number. */
  leetcodeId: number
  /** LeetCode URL slug; the url is derived, never hand-written. */
  slug: string
  title: string
  difficulty: Difficulty
  tier: TierId
  topicId: string
  primaryPattern: string
  secondaryPatterns: string[]
  subPattern?: string
  /** Question ids that should be solved first. */
  prerequisites: string[]
  classification: Classification
  /** Position within its pattern's ladder. */
  order: number
  /** What you should be able to do after solving it. */
  learningObjective: string
  /** Why this problem earns a place in the roadmap. Never generic. */
  rationale: string
  expectedTC: string
  expectedSC: string
  priority: Priority
  googlePriority: boolean
  companyTags: string[]
}

/** Derived, never stored. */
export function questionUrl(question: Question): string {
  return `https://leetcode.com/problems/${question.slug}/`
}

/**
 * The shape served to the client in blind interview mode.
 * Pattern, topic and classification are stripped at the data layer
 * rather than hidden with CSS — if the answer is in the DOM, the
 * mode is theatre.
 */
export type RedactedQuestion = Pick<
  Question,
  'id' | 'leetcodeId' | 'slug' | 'title' | 'difficulty' | 'expectedTC' | 'expectedSC'
>

export function redact(question: Question): RedactedQuestion {
  return {
    id: question.id,
    leetcodeId: question.leetcodeId,
    slug: question.slug,
    title: question.title,
    difficulty: question.difficulty,
    expectedTC: question.expectedTC,
    expectedSC: question.expectedSC,
  }
}

/* ── Progress ────────────────────────────────────────────── */

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5
export type Bucket = 'GREEN' | 'YELLOW' | 'RED' | 'BLACK'
export type AttemptOutcome = 'solved' | 'partial' | 'failed'

export type MistakeTag =
  | 'wrong-pattern'
  | 'off-by-one'
  | 'edge-case'
  | 'null-empty'
  | 'overflow'
  | 'complexity-misread'
  | 'recursion-base-case'
  | 'state-transition'
  | 'syntax-api'
  | 'ran-out-of-time'

export type Attempt = {
  questionId: string
  /** ISO timestamp. */
  at: string
  outcome: AttemptOutcome
  solvedIndependently: boolean
  hintsUsed: 0 | 1 | 2 | 3
  minutesTaken: number
  mistakes: MistakeTag[]
  underInterviewConditions: boolean
}

export type QuestionProgress = {
  questionId: string
  attempts: Attempt[]
  masteryLevel: MasteryLevel
  bucket: Bucket
  lastRevisedAt?: string
  nextDueAt?: string
  /** Indexes the 0 / 1 / 3 / 7 / 14 / 30 day ladder. */
  revisionStage: 0 | 1 | 2 | 3 | 4 | 5
}

export type ProgressSnapshot = {
  version: 1
  updatedAt: string
  questions: Record<string, QuestionProgress>
}

export const EMPTY_SNAPSHOT: ProgressSnapshot = {
  version: 1,
  updatedAt: '1970-01-01T00:00:00.000Z',
  questions: {},
}
