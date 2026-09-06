import type { ProgressSnapshot, Question, TierId } from '@/data/dsa/types'
import { questionsByTier } from '@/data/dsa/questions'
import { patternsByTier } from '@/data/dsa/patterns'
import { questionsByPattern } from '@/data/dsa/questions'
import { patternMastery, questionMastery } from './mastery'
import { daysOverdue } from './revision'

/**
 * Readiness is deliberately NOT percent-of-questions-completed.
 *
 * The weights below are chosen so that grinding volume without
 * independence barely moves the number: half the score comes from
 * solving unaided and from blind exit tests.
 */
export const WEIGHTS = {
  independentMustRate: 0.30,
  patternCoverage: 0.25,
  exitTestRate: 0.20,
  interviewPerformance: 0.15,
  revisionHealth: 0.10,
} as const

export type ReadinessComponent = {
  key: keyof typeof WEIGHTS
  label: string
  /** 0–1 */
  score: number
  weight: number
  /** Why it is not higher — shown next to the figure, never a bare number. */
  detail: string
}

export type TierReadiness = {
  tier: TierId
  /** 0–100, rounded. */
  overall: number
  components: ReadinessComponent[]
  redOrBlackPatterns: string[]
}

function rate(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator
}

function solvedIndependently(question: Question, snapshot: ProgressSnapshot): boolean {
  const entry = snapshot.questions[question.id]
  if (!entry) return false
  return entry.attempts.some((a) => a.outcome === 'solved' && a.solvedIndependently && a.hintsUsed === 0)
}

export function tierReadiness(
  tier: TierId,
  snapshot: ProgressSnapshot,
  now: Date = new Date(),
): TierReadiness {
  const tierQuestions = questionsByTier(tier)
  const mustQuestions = tierQuestions.filter((q) => q.priority === 'must')
  const exitTests = tierQuestions.filter((q) => q.classification === 'EXIT_TEST')
  const tierPatterns = patternsByTier(tier)

  // 1 — independent solve rate on must-do questions.
  const independentMust = mustQuestions.filter((q) => solvedIndependently(q, snapshot)).length
  const independentMustRate = rate(independentMust, mustQuestions.length)

  // 2 — patterns at mastery level 3 or above.
  const covered = tierPatterns.filter(
    (pattern) => patternMastery(questionsByPattern(pattern.id), snapshot.questions, now) >= 3,
  ).length
  const patternCoverage = rate(covered, tierPatterns.length)

  // 3 — blind exit tests passed.
  const exitPassed = exitTests.filter((q) => solvedIndependently(q, snapshot)).length
  const exitTestRate = rate(exitPassed, exitTests.length)

  // 4 — performance under interview conditions.
  const interviewAttempts = tierQuestions.flatMap(
    (q) => snapshot.questions[q.id]?.attempts.filter((a) => a.underInterviewConditions) ?? [],
  )
  const interviewPassed = interviewAttempts.filter((a) => a.outcome === 'solved' && a.solvedIndependently).length
  const interviewPerformance = rate(interviewPassed, interviewAttempts.length)

  // 5 — revision health: the inverse of overdue and struggling questions.
  const tracked = tierQuestions.map((q) => snapshot.questions[q.id]).filter(Boolean)
  const unhealthy = tracked.filter(
    (entry) => entry.bucket === 'RED' || entry.bucket === 'BLACK' || daysOverdue(entry, now) > 0,
  ).length
  const revisionHealth = tracked.length === 0 ? 0 : 1 - rate(unhealthy, tracked.length)

  const redOrBlackPatterns = tierPatterns
    .filter((pattern) =>
      questionsByPattern(pattern.id).some((q) => {
        const entry = snapshot.questions[q.id]
        return entry?.bucket === 'RED' || entry?.bucket === 'BLACK'
      }),
    )
    .map((pattern) => pattern.title)

  const components: ReadinessComponent[] = [
    {
      key: 'independentMustRate', label: 'Independent solves on must-do questions',
      score: independentMustRate, weight: WEIGHTS.independentMustRate,
      detail: `${independentMust} of ${mustQuestions.length} solved with no hints`,
    },
    {
      key: 'patternCoverage', label: 'Patterns at level 3 or above',
      score: patternCoverage, weight: WEIGHTS.patternCoverage,
      detail: `${covered} of ${tierPatterns.length} patterns`,
    },
    {
      key: 'exitTestRate', label: 'Blind exit tests passed',
      score: exitTestRate, weight: WEIGHTS.exitTestRate,
      detail: exitTests.length === 0 ? 'No exit tests authored yet' : `${exitPassed} of ${exitTests.length}`,
    },
    {
      key: 'interviewPerformance', label: 'Solved under interview conditions',
      score: interviewPerformance, weight: WEIGHTS.interviewPerformance,
      detail: interviewAttempts.length === 0
        ? 'No timed attempts recorded'
        : `${interviewPassed} of ${interviewAttempts.length} timed attempts`,
    },
    {
      key: 'revisionHealth', label: 'Revision health',
      score: revisionHealth, weight: WEIGHTS.revisionHealth,
      detail: tracked.length === 0 ? 'Nothing tracked yet' : `${unhealthy} of ${tracked.length} overdue or struggling`,
    },
  ]

  const overall = components.reduce((sum, c) => sum + c.score * c.weight, 0)

  return {
    tier,
    overall: Math.round(overall * 100),
    components,
    redOrBlackPatterns,
  }
}

/** Weakest patterns first, by independent-solve rate. Drives "what next". */
export function weakestPatterns(snapshot: ProgressSnapshot, limit = 5) {
  return patternsByTier(1)
    .concat(patternsByTier(2), patternsByTier(3))
    .map((pattern) => {
      const qs = questionsByPattern(pattern.id)
      const attempted = qs.filter((q) => snapshot.questions[q.id])
      const independent = attempted.filter((q) => solvedIndependently(q, snapshot)).length
      return {
        pattern,
        attempted: attempted.length,
        independentRate: rate(independent, attempted.length),
      }
    })
    .filter((row) => row.attempted > 0)
    .sort((a, b) => a.independentRate - b.independentRate)
    .slice(0, limit)
}

export { questionMastery }
