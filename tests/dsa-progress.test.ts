import { describe, expect, it } from 'vitest'
import type { Attempt, ProgressSnapshot, Question, QuestionProgress } from '@/data/dsa/types'
import { EMPTY_SNAPSHOT } from '@/data/dsa/types'
import { DECAY_DAYS, patternMastery, questionMastery, TIME_BUDGET } from '@/lib/dsa/mastery'
import { applyAttempt, classifyBucket, daysOverdue, isDue, LADDER_DAYS, nextStage } from '@/lib/dsa/revision'
import { tierReadiness, WEIGHTS } from '@/lib/dsa/readiness'
import { MemoryProgressStore } from '@/lib/dsa/storage'
import { questions } from '@/data/dsa/questions'

const attempt = (over: Partial<Attempt> = {}): Attempt => ({
  questionId: 'lc-3',
  at: '2026-09-01T10:00:00.000Z',
  outcome: 'solved',
  solvedIndependently: true,
  hintsUsed: 0,
  minutesTaken: 20,
  mistakes: [],
  underInterviewConditions: false,
  ...over,
})

describe('question mastery', () => {
  it('is 0 with no attempts', () => {
    expect(questionMastery([], 'Medium')).toBe(0)
  })

  it('is 1 after an attempt that failed', () => {
    expect(questionMastery([attempt({ outcome: 'failed', solvedIndependently: false })], 'Medium')).toBe(1)
  })

  it('is 2 when solved with hints', () => {
    expect(questionMastery([attempt({ hintsUsed: 2, solvedIndependently: false })], 'Medium')).toBe(2)
  })

  it('does NOT reach 3 on two independent solves the same day', () => {
    const same = [
      attempt({ at: '2026-09-01T10:00:00.000Z' }),
      attempt({ at: '2026-09-01T18:00:00.000Z' }),
    ]
    expect(questionMastery(same, 'Medium')).toBe(2)
  })

  it('reaches 3 on two independent solves across different days', () => {
    const spread = [
      attempt({ at: '2026-09-01T10:00:00.000Z' }),
      attempt({ at: '2026-09-04T10:00:00.000Z' }),
    ]
    expect(questionMastery(spread, 'Medium')).toBe(3)
  })

  it('reaches 4 only inside the time budget under interview conditions', () => {
    const overBudget = attempt({ underInterviewConditions: true, minutesTaken: TIME_BUDGET.Medium + 5 })
    expect(questionMastery([overBudget], 'Medium')).toBe(2)

    const inBudget = attempt({ underInterviewConditions: true, minutesTaken: TIME_BUDGET.Medium - 5 })
    expect(questionMastery([inBudget], 'Medium')).toBe(4)
  })
})

describe('pattern mastery', () => {
  const core: Question = questions.find((q) => q.id === 'lc-3')!
  const variation: Question = questions.find((q) => q.id === 'lc-424')!

  const progressFor = (entries: Record<string, Attempt[]>): Record<string, QuestionProgress> =>
    Object.fromEntries(
      Object.entries(entries).map(([id, attempts]) => [
        id,
        { questionId: id, attempts, masteryLevel: 0, bucket: 'GREEN', revisionStage: 0 } as QuestionProgress,
      ]),
    )

  it('will not award level 5 without a variation or combination solve', () => {
    const progress = progressFor({
      'lc-3': [attempt({ underInterviewConditions: true, minutesTaken: 20 })],
    })
    expect(patternMastery([core, variation], progress, new Date('2026-09-02T00:00:00Z'))).toBe(4)
  })

  it('awards level 5 once the idea transfers to a variation', () => {
    const progress = progressFor({
      'lc-3': [attempt({ underInterviewConditions: true, minutesTaken: 20 })],
      'lc-424': [attempt({ questionId: 'lc-424' })],
    })
    expect(patternMastery([core, variation], progress, new Date('2026-09-02T00:00:00Z'))).toBe(5)
  })

  it('decays level 4 back to 3 after the decay window', () => {
    const progress = progressFor({
      'lc-3': [attempt({ underInterviewConditions: true, minutesTaken: 20, at: '2026-06-01T10:00:00.000Z' })],
    })
    const wellAfter = new Date(new Date('2026-06-01T10:00:00.000Z').getTime() + (DECAY_DAYS + 5) * 86_400_000)
    expect(patternMastery([core], progress, wellAfter)).toBe(3)
  })
})

describe('revision buckets', () => {
  it('is BLACK when the latest attempt was not independent', () => {
    expect(classifyBucket([attempt({ solvedIndependently: false })], 'Medium')).toBe('BLACK')
  })

  it('is RED when hints were used, or the pattern was misread', () => {
    expect(classifyBucket([attempt(), attempt({ hintsUsed: 1 })], 'Medium')).toBe('RED')
    expect(classifyBucket([attempt({ mistakes: ['wrong-pattern'] })], 'Medium')).toBe('RED')
  })

  it('is YELLOW when solved unaided but over the time budget', () => {
    expect(classifyBucket([attempt({ minutesTaken: TIME_BUDGET.Medium + 10 })], 'Medium')).toBe('YELLOW')
  })

  it('is GREEN when clean and inside the budget', () => {
    expect(classifyBucket([attempt(), attempt()], 'Medium')).toBe('GREEN')
  })

  it('judges on recent attempts only, so an old struggle stops counting', () => {
    const history = [
      attempt({ solvedIndependently: false, outcome: 'failed' }),
      attempt(), attempt(), attempt(),
    ]
    expect(classifyBucket(history, 'Medium')).toBe('GREEN')
  })
})

describe('spaced repetition ladder', () => {
  it('advances on GREEN and holds on YELLOW', () => {
    expect(nextStage(1, 'GREEN')).toBe(2)
    expect(nextStage(1, 'YELLOW')).toBe(1)
  })

  it('drops two on RED and resets on BLACK', () => {
    expect(nextStage(4, 'RED')).toBe(2)
    expect(nextStage(1, 'RED')).toBe(0)
    expect(nextStage(5, 'BLACK')).toBe(0)
  })

  it('never advances past the end of the ladder', () => {
    expect(nextStage(5, 'GREEN')).toBe(5)
    expect(LADDER_DAYS[5]).toBe(30)
  })

  it('schedules a BLACK question for tomorrow and a GREEN one further out', () => {
    const black = applyAttempt(undefined, attempt({ outcome: 'failed', solvedIndependently: false }), 'Medium', 1)
    expect(black.bucket).toBe('BLACK')
    expect(black.revisionStage).toBe(0)

    const green = applyAttempt(
      { questionId: 'lc-3', attempts: [attempt()], masteryLevel: 3, bucket: 'GREEN', revisionStage: 2 },
      attempt({ at: '2026-09-05T10:00:00.000Z' }),
      'Medium',
      3,
    )
    expect(green.bucket).toBe('GREEN')
    expect(green.revisionStage).toBe(3)
  })

  it('reports due and overdue correctly', () => {
    const progress = applyAttempt(undefined, attempt(), 'Medium', 1)
    expect(isDue(progress, new Date('2026-09-01T09:00:00.000Z'))).toBe(false)
    expect(isDue(progress, new Date('2026-09-20T00:00:00.000Z'))).toBe(true)
    expect(daysOverdue(progress, new Date('2026-09-20T00:00:00.000Z'))).toBeGreaterThan(0)
  })
})

describe('readiness', () => {
  it('weights sum to one', () => {
    const total = Object.values(WEIGHTS).reduce((a, b) => a + b, 0)
    expect(Number(total.toFixed(5))).toBe(1)
  })

  it('is zero on an empty snapshot and explains why', () => {
    const readiness = tierReadiness(1, EMPTY_SNAPSHOT)
    expect(readiness.overall).toBe(0)
    expect(readiness.components).toHaveLength(5)
    for (const component of readiness.components) {
      expect(component.detail.length).toBeGreaterThan(0)
    }
  })

  it('does not reach high readiness from volume alone without independence', () => {
    const withHints: ProgressSnapshot = {
      version: 1,
      updatedAt: new Date().toISOString(),
      questions: Object.fromEntries(
        questions.map((q) => [
          q.id,
          {
            questionId: q.id,
            attempts: [attempt({ questionId: q.id, hintsUsed: 2, solvedIndependently: false })],
            masteryLevel: 2,
            bucket: 'RED',
            revisionStage: 0,
          } as QuestionProgress,
        ]),
      ),
    }
    // Every question "done", none of them independently.
    expect(tierReadiness(1, withHints).overall).toBeLessThan(20)
  })
})

describe('progress store', () => {
  it('round-trips an export and import', async () => {
    const store = new MemoryProgressStore()
    const next = applyAttempt(undefined, attempt(), 'Medium', 2)
    await store.recordAttempt(attempt(), next)

    const backup = await store.export()
    const fresh = new MemoryProgressStore()
    const result = await fresh.import(backup)

    expect(result.ok).toBe(true)
    if (result.ok) expect(result.questions).toBe(1)
    expect((await fresh.load()).questions['lc-3'].attempts).toHaveLength(1)
  })

  it('rejects malformed backups without throwing', async () => {
    const result = await new MemoryProgressStore().import('{ not json')
    expect(result.ok).toBe(false)
  })
})
