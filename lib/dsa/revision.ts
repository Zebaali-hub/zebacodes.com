import type { Attempt, Bucket, Difficulty, QuestionProgress } from '@/data/dsa/types'
import { TIME_BUDGET } from './mastery'

/**
 * Revision buckets and spaced repetition.
 *
 * The bucket is derived from the LAST THREE attempts, not the whole
 * history — what matters before an interview is how you are solving now,
 * not that you once struggled with it in April.
 */

export const LADDER_DAYS = [0, 1, 3, 7, 14, 30] as const
export type RevisionStage = 0 | 1 | 2 | 3 | 4 | 5

const DAY_MS = 86_400_000
const RECENT = 3

export function classifyBucket(attempts: Attempt[], difficulty: Difficulty): Bucket {
  if (attempts.length === 0) return 'BLACK'

  const recent = attempts.slice(-RECENT)
  const budget = TIME_BUDGET[difficulty]

  // BLACK — could not solve independently in the most recent attempt.
  const last = recent[recent.length - 1]
  if (last.outcome === 'failed' || !last.solvedIndependently) return 'BLACK'

  // RED — needed hints recently, or misread the pattern at all.
  const neededHelp = recent.some((a) => a.hintsUsed > 0)
  const wrongPattern = recent.some((a) => a.mistakes.includes('wrong-pattern'))
  if (neededHelp || wrongPattern) return 'RED'

  // YELLOW — solved unaided but slowly, or with a partial along the way.
  const slow = recent.some((a) => a.minutesTaken > budget)
  const hesitant = recent.some((a) => a.outcome === 'partial' || a.mistakes.length > 0)
  if (slow || hesitant) return 'YELLOW'

  return 'GREEN'
}

/**
 * How the bucket moves the stage along the ladder.
 * GREEN advances, YELLOW holds, RED drops two, BLACK resets to tomorrow.
 */
export function nextStage(current: RevisionStage, bucket: Bucket): RevisionStage {
  switch (bucket) {
    case 'GREEN':
      return Math.min(current + 1, LADDER_DAYS.length - 1) as RevisionStage
    case 'YELLOW':
      return current
    case 'RED':
      return Math.max(current - 2, 0) as RevisionStage
    case 'BLACK':
      return 0
  }
}

export function nextDueDate(stage: RevisionStage, from: Date): string {
  const due = new Date(from.getTime() + LADDER_DAYS[stage] * DAY_MS)
  return due.toISOString()
}

/** Applies one attempt to a question's progress. Pure — returns a new object. */
export function applyAttempt(
  previous: QuestionProgress | undefined,
  attempt: Attempt,
  difficulty: Difficulty,
  masteryLevel: QuestionProgress['masteryLevel'],
): QuestionProgress {
  const attempts = [...(previous?.attempts ?? []), attempt]
  const bucket = classifyBucket(attempts, difficulty)
  const stage = nextStage((previous?.revisionStage ?? 0) as RevisionStage, bucket)
  const at = new Date(attempt.at)

  return {
    questionId: attempt.questionId,
    attempts,
    masteryLevel,
    bucket,
    lastRevisedAt: attempt.at,
    nextDueAt: nextDueDate(stage, at),
    revisionStage: stage,
  }
}

export function isDue(progress: QuestionProgress, now: Date = new Date()): boolean {
  if (!progress.nextDueAt) return true
  return new Date(progress.nextDueAt).getTime() <= now.getTime()
}

export function daysOverdue(progress: QuestionProgress, now: Date = new Date()): number {
  if (!progress.nextDueAt) return 0
  const diff = now.getTime() - new Date(progress.nextDueAt).getTime()
  return diff <= 0 ? 0 : Math.floor(diff / DAY_MS)
}

export const BUCKET_LABELS: Record<Bucket, string> = {
  GREEN: 'Consistently independent',
  YELLOW: 'Solved, but slow or hesitant',
  RED: 'Needed hints or misread the pattern',
  BLACK: 'Could not solve independently',
}
