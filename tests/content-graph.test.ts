import { describe, expect, it } from 'vitest'
import { roadmaps, allTopics, resolveTopic } from '@/content/roadmaps'
import { availableModes } from '@/content/types'
import { danglingRefs, edgesFrom, crossRoadmapEdges, search } from '@/lib/content/graph'

describe('content graph integrity', () => {
  it('resolves every cross-roadmap reference', () => {
    expect(danglingRefs()).toEqual([])
  })

  it('gives every topic a unique id within its roadmap', () => {
    for (const roadmap of roadmaps) {
      const ids = roadmap.tiers.flatMap((t) => t.topics.map((x) => x.id))
      expect(new Set(ids).size, `duplicate topic id in ${roadmap.id}`).toBe(ids.length)
    }
  })

  it('never lets a relationship point at itself', () => {
    for (const topic of allTopics) {
      for (const edge of edgesFrom(topic)) {
        expect(edge.topic === topic, `${topic.id} references itself`).toBe(false)
      }
    }
  })

  it('annotates every related edge with a reason', () => {
    for (const topic of allTopics) {
      for (const rel of topic.related) {
        expect(rel.why.length, `${topic.roadmap}/${topic.id} → ${rel.to.topic} has no why`).toBeGreaterThan(20)
      }
    }
  })
})

describe('panel modes', () => {
  it('offers Practice only where it is authored', () => {
    for (const topic of allTopics) {
      const modes = availableModes(topic)
      expect(modes.includes('practice')).toBe(Boolean(topic.practice))
      expect(modes.includes('interview')).toBe(topic.interviewQuestions.length > 0)
      expect(modes[0]).toBe('learn')
    }
  })

  it('hides Practice on conceptual topics and shows it on coding ones', () => {
    const gc = resolveTopic({ roadmap: 'java', topic: 'gc' })!
    const executor = resolveTopic({ roadmap: 'java', topic: 'executor-service' })!
    expect(availableModes(gc)).not.toContain('practice')
    expect(availableModes(executor)).toContain('practice')
  })
})

describe('the two exemplar chains', () => {
  it('connects @Transactional to the database and distributed layers', () => {
    const tx = resolveTopic({ roadmap: 'spring', topic: 'transactional-deep' })!
    const reached = crossRoadmapEdges(tx).map((e) => `${e.topic.roadmap}/${e.topic.id}`)
    expect(reached).toContain('database/acid-transactions')
    expect(reached).toContain('database/isolation-levels')
    expect(reached).toContain('database/mvcc')
    expect(reached).toContain('hld/idempotency')
  })

  it('connects ExecutorService to Spring async and HLD scaling', () => {
    const ex = resolveTopic({ roadmap: 'java', topic: 'executor-service' })!
    const reached = crossRoadmapEdges(ex).map((e) => `${e.topic.roadmap}/${e.topic.id}`)
    expect(reached).toContain('spring/async')
    expect(reached).toContain('hld/concurrency-scaling')
    expect(reached).toContain('hld/backpressure')
  })
})

describe('DSA depth is preserved, not flattened', () => {
  it('keeps pattern ids on DSA topics', () => {
    const dsa = allTopics.filter((t) => t.roadmap === 'dsa')
    const withPatterns = dsa.filter((t) => (t.patternIds?.length ?? 0) > 0)
    expect(withPatterns.length).toBeGreaterThan(20)
  })

  it('does not invent interview questions for DSA topics', () => {
    for (const topic of allTopics.filter((t) => t.roadmap === 'dsa')) {
      expect(topic.interviewQuestions).toEqual([])
    }
  })
})

describe('structured retrieval', () => {
  it('finds MVCC and surfaces its cross-roadmap connections', () => {
    const hits = search('mvcc')
    expect(hits[0].topic.id).toBe('mvcc')
    expect(hits[0].path).toContain('Database')
    expect(hits[0].path).toContain('Tier 2')
    const connected = crossRoadmapEdges(hits[0].topic).map((e) => e.topic.id)
    expect(connected).toContain('transactional-deep')
  })

  it('matches on body text as well as titles', () => {
    expect(search('deadlock').length).toBeGreaterThan(1)
  })

  it('returns nothing for a one-character query', () => {
    expect(search('m')).toEqual([])
  })
})
