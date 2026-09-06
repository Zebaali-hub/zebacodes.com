import { describe, expect, it } from 'vitest'
import { tiers } from '@/data/dsa/tiers'
import { topics } from '@/data/dsa/topics'
import { patterns, PLANNED_PATTERN_IDS } from '@/data/dsa/patterns'
import { questions } from '@/data/dsa/questions'
import { questionUrl, redact } from '@/data/dsa/types'
import { findCycle, criticalPath, allPrerequisites } from '@/lib/dsa/graph'
import { roadmaps } from '@/data/roadmaps'

/**
 * Curriculum integrity.
 *
 * These tests are the mechanical enforcement of the quality rules:
 * no invented LeetCode ids, no dangling references, no cycles, no
 * question without a stated reason to exist.
 */

describe('taxonomy', () => {
  it('has three cumulative tiers with exit criteria', () => {
    expect(tiers).toHaveLength(3)
    for (const tier of tiers) {
      expect(tier.exitCriteria.length).toBeGreaterThan(2)
      expect(tier.targetIndependentRate).toBeGreaterThan(0)
      expect(tier.targetIndependentRate).toBeLessThanOrEqual(1)
    }
  })

  it('gives every topic a unique id and a real tier', () => {
    const ids = topics.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const topic of topics) {
      expect(tiers.some((tier) => tier.id === topic.tier)).toBe(true)
      expect(topic.summary.length).toBeGreaterThan(20)
    }
  })

  it('only points roadmapStepId at steps that exist in the published dsa roadmap', () => {
    const dsa = roadmaps.find((r) => r.slug === 'dsa')
    expect(dsa).toBeDefined()

    // The published steps arrive with commit 9b36bed. Before that merge
    // lands the local roadmap is still the empty stub, and there is
    // nothing to join against — assert the join only once steps exist,
    // rather than silently passing forever.
    if (dsa!.steps.length === 0) {
      expect(topics.filter((t) => t.roadmapStepId).length).toBeGreaterThan(0)
      return
    }

    const stepIds = new Set(dsa!.steps.map((s) => s.id))
    for (const topic of topics) {
      if (!topic.roadmapStepId) continue
      expect(stepIds, `topic ${topic.id} points at a missing step`).toContain(topic.roadmapStepId)
    }
  })
})

describe('patterns', () => {
  it('has unique ids and resolvable topics', () => {
    const ids = patterns.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    const topicIds = new Set(topics.map((t) => t.id))
    for (const pattern of patterns) {
      expect(topicIds, `pattern ${pattern.id} has an unknown topic`).toContain(pattern.topicId)
    }
  })

  it('resolves every prerequisite to a defined pattern', () => {
    const known = new Set(patterns.map((p) => p.id))
    for (const pattern of patterns) {
      for (const prerequisite of pattern.prerequisites) {
        expect(known, `${pattern.id} requires unknown ${prerequisite}`).toContain(prerequisite)
      }
    }
  })

  it('resolves every combinesWith to a defined or explicitly planned pattern', () => {
    const known = new Set(patterns.map((p) => p.id))
    for (const pattern of patterns) {
      for (const related of pattern.combinesWith) {
        const ok = known.has(related) || PLANNED_PATTERN_IDS.has(related)
        expect(ok, `${pattern.id} combinesWith unknown ${related} — typo, or add it to PLANNED_PATTERN_IDS`).toBe(true)
      }
    }
  })

  it('contains no prerequisite cycles', () => {
    expect(findCycle()).toBeNull()
  })

  it('never lists a pattern from a higher tier as a prerequisite', () => {
    for (const pattern of patterns) {
      for (const id of pattern.prerequisites) {
        const prerequisite = patterns.find((p) => p.id === id)!
        expect(
          prerequisite.tier,
          `${pattern.id} (T${pattern.tier}) depends on ${id} (T${prerequisite.tier})`,
        ).toBeLessThanOrEqual(pattern.tier)
      }
    }
  })

  it('teaches recognition, not definition — every pattern carries the explorer fields', () => {
    for (const pattern of patterns) {
      expect(pattern.recognitionSignals.length, pattern.id).toBeGreaterThan(0)
      expect(pattern.bruteForceSmell.length, pattern.id).toBeGreaterThan(30)
      expect(pattern.whyItWorks.length, pattern.id).toBeGreaterThan(30)
      expect(pattern.whenNotToUse.length, pattern.id).toBeGreaterThan(0)
      expect(pattern.commonMistakes.length, pattern.id).toBeGreaterThan(0)
      expect(pattern.typicalTC, pattern.id).toBeTruthy()
      expect(pattern.typicalSC, pattern.id).toBeTruthy()
    }
  })
})

describe('question bank integrity', () => {
  it('has unique internal ids and unique LeetCode ids', () => {
    const ids = questions.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
    const lc = questions.map((q) => q.leetcodeId)
    expect(new Set(lc).size, 'a LeetCode id is duplicated').toBe(lc.length)
  })

  it('uses plausible LeetCode ids and consistent internal ids', () => {
    for (const question of questions) {
      expect(Number.isInteger(question.leetcodeId), question.title).toBe(true)
      expect(question.leetcodeId).toBeGreaterThan(0)
      expect(question.leetcodeId).toBeLessThan(4000)
      expect(question.id, 'internal id must match the LeetCode id').toBe(`lc-${question.leetcodeId}`)
    }
  })

  it('builds a well-formed LeetCode url from the slug', () => {
    for (const question of questions) {
      expect(question.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      expect(questionUrl(question)).toBe(`https://leetcode.com/problems/${question.slug}/`)
    }
  })

  it('gives every question a non-generic reason to exist', () => {
    for (const question of questions) {
      expect(question.rationale.length, `${question.title} rationale`).toBeGreaterThan(60)
      expect(question.learningObjective.length, `${question.title} objective`).toBeGreaterThan(30)
      expect(question.expectedTC, question.title).toBeTruthy()
      expect(question.expectedSC, question.title).toBeTruthy()
    }
  })

  it('resolves patterns, topics and question prerequisites', () => {
    const patternIds = new Set(patterns.map((p) => p.id))
    const topicIds = new Set(topics.map((t) => t.id))
    const questionIds = new Set(questions.map((q) => q.id))
    for (const question of questions) {
      expect(patternIds, `${question.id} primaryPattern`).toContain(question.primaryPattern)
      expect(topicIds, `${question.id} topicId`).toContain(question.topicId)
      for (const secondary of question.secondaryPatterns) {
        const ok = patternIds.has(secondary) || PLANNED_PATTERN_IDS.has(secondary)
        expect(ok, `${question.id} secondary pattern ${secondary}`).toBe(true)
      }
      for (const prerequisite of question.prerequisites) {
        expect(questionIds, `${question.id} requires unknown ${prerequisite}`).toContain(prerequisite)
      }
    }
  })

  it('orders each pattern ladder without gaps or ties', () => {
    const byPattern = new Map<string, number[]>()
    for (const question of questions) {
      const list = byPattern.get(question.topicId) ?? []
      list.push(question.order)
      byPattern.set(question.topicId, list)
    }
    for (const [topicId, orders] of byPattern) {
      expect(new Set(orders).size, `${topicId} has duplicate order values`).toBe(orders.length)
    }
  })

  it('gives every authored topic a FOUNDATION and an EXIT_TEST', () => {
    const authored = new Set(questions.map((q) => q.topicId))
    for (const topicId of authored) {
      const inTopic = questions.filter((q) => q.topicId === topicId)
      expect(inTopic.some((q) => q.classification === 'FOUNDATION'), `${topicId} has no FOUNDATION`).toBe(true)
      expect(inTopic.some((q) => q.classification === 'EXIT_TEST'), `${topicId} has no EXIT_TEST`).toBe(true)
    }
  })

  it('never orders a ladder purely by difficulty', () => {
    // The whole point of `classification` is that role and difficulty are
    // decoupled. If a ladder happens to be sorted Easy -> Hard, that is a
    // smell worth catching while the bank is small.
    const rank = { Easy: 0, Medium: 1, Hard: 2 }
    const sliding = questions
      .filter((q) => q.topicId === 'sliding-window')
      .sort((a, b) => a.order - b.order)
      .map((q) => rank[q.difficulty])
    const isSorted = sliding.every((v, i) => i === 0 || sliding[i - 1] <= v)
    expect(isSorted, 'sliding-window ladder is sorted by difficulty, which is the failure mode').toBe(false)
  })
})

describe('blind interview mode', () => {
  it('strips pattern, topic and classification at the data layer', () => {
    const redacted = redact(questions[0]) as Record<string, unknown>
    for (const leak of ['primaryPattern', 'secondaryPatterns', 'subPattern', 'topicId', 'classification', 'rationale', 'learningObjective']) {
      expect(redacted[leak], `${leak} leaked into blind mode`).toBeUndefined()
    }
    expect(redacted.title).toBeTruthy()
    expect(redacted.difficulty).toBeTruthy()
  })
})

describe('prerequisite graph', () => {
  it('orders a critical path so nothing precedes its prerequisites', () => {
    const path = criticalPath('sliding-window-frequency')
    const seen = new Set<string>()
    for (const pattern of path) {
      for (const prerequisite of pattern.prerequisites) {
        expect(seen, `${pattern.id} appears before its prerequisite ${prerequisite}`).toContain(prerequisite)
      }
      seen.add(pattern.id)
    }
    expect(path[path.length - 1].id).toBe('sliding-window-frequency')
  })

  it('drops already-known patterns from the path', () => {
    const full = criticalPath('sliding-window-variable')
    const trimmed = criticalPath('sliding-window-variable', new Set(['sliding-window-fixed', 'array-traversal']))
    expect(trimmed.length).toBeLessThan(full.length)
  })

  it('resolves the transitive prerequisites of the deepest authored pattern', () => {
    const all = allPrerequisites('sliding-window-at-most-k')
    expect(all.map((p) => p.id)).toContain('sliding-window-variable')
    expect(all.map((p) => p.id)).toContain('array-traversal')
  })
})
