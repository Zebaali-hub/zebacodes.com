import type { Attempt, Difficulty, MasteryLevel, Question, QuestionProgress } from '@/data/dsa/types'

/**
 * Mastery is COMPUTED from attempt history, never set by hand.
 *
 * That is the whole point: a checkbox tracker lets you mark things done,
 * and two months later the roadmap is lying to you the week of an
 * interview. Every level below has to be earned by recorded evidence.
 */

/** Interview time budget by difficulty, in minutes. */
export const TIME_BUDGET: Record<Difficulty, number> = {
  Easy: 20,
  Medium: 30,
  Hard: 45,
}

/** A level-4 pattern left untouched this long decays to level 3. */
export const DECAY_DAYS = 45

const DAY_MS = 86_400_000

function dayKey(iso: string): string {
  return iso.slice(0, 10)
}

/**
 * Per-question mastery, capped at 4.
 *
 * Level 5 is a PATTERN-level property — it requires solving a variation
 * or combination elsewhere in the same pattern — so a single question
 * can never award it. See patternMastery below.
 */
export function questionMastery(attempts: Attempt[], difficulty: Difficulty): MasteryLevel {
  if (attempts.length === 0) return 0

  const clean = attempts.filter((a) => a.outcome === 'solved' && a.solvedIndependently && a.hintsUsed === 0)

  // Level 4 — independent, under interview conditions, inside the budget.
  const underPressure = clean.some(
    (a) => a.underInterviewConditions && a.minutesTaken <= TIME_BUDGET[difficulty],
  )
  if (underPressure) return 4

  // Level 3 — two independent solves on DIFFERENT days. Same-day repeats
  // measure short-term recall, not retention.
  const distinctDays = new Set(clean.map((a) => dayKey(a.at)))
  if (distinctDays.size >= 2) return 3

  // Level 2 — solved, but with help.
  if (attempts.some((a) => a.outcome === 'solved')) return 2

  // Level 1 — seen and attempted.
  return 1
}

/**
 * Pattern-level mastery, 0–5, with decay applied.
 *
 * Level 5 requires a level-4 question plus an independently solved
 * VARIATION or COMBINATION in the same pattern — evidence that the idea
 * transfers rather than that one problem was memorised.
 */
export function patternMastery(
  patternQuestions: Question[],
  progress: Record<string, QuestionProgress>,
  now: Date = new Date(),
): MasteryLevel {
  if (patternQuestions.length === 0) return 0

  const levels = patternQuestions.map((question) => {
    const entry = progress[question.id]
    return entry ? questionMastery(entry.attempts, question.difficulty) : 0
  })

  const best = Math.max(...levels) as MasteryLevel
  if (best === 0) return 0

  if (best >= 4) {
    const transfers = patternQuestions.some((question) => {
      if (question.classification !== 'VARIATION' && question.classification !== 'COMBINATION') return false
      const entry = progress[question.id]
      if (!entry) return false
      return entry.attempts.some((a) => a.outcome === 'solved' && a.solvedIndependently && a.hintsUsed === 0)
    })
    if (transfers) return 5
  }

  // Decay: a level-4 pattern nobody has touched in DECAY_DAYS drops a level
  // and re-enters the revision queue.
  if (best === 4) {
    const lastTouched = patternQuestions
      .flatMap((question) => progress[question.id]?.attempts ?? [])
      .map((a) => new Date(a.at).getTime())
      .reduce((max, t) => Math.max(max, t), 0)

    if (lastTouched > 0 && now.getTime() - lastTouched > DECAY_DAYS * DAY_MS) return 3
  }

  return best
}

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  0: 'Never seen',
  1: 'Understands concept',
  2: 'Solves with help',
  3: 'Solves independently',
  4: 'Solves under interview conditions',
  5: 'Solves variations, can explain',
}
