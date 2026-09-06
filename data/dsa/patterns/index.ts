import type { Pattern } from '../types'
import { tier1Patterns } from './tier1'
import { slidingWindowPatterns } from './sliding-window'
import { tier1StructurePatterns } from './tier1-structures'

/**
 * Tier 2 and Tier 3 pattern ids that are referenced by `combinesWith`
 * but not yet authored. Declaring them keeps the integrity test honest:
 * a reference to a PLANNED id is allowed, a reference to a typo is not.
 *
 * Remove an id from here the moment its Pattern is written.
 */
export const PLANNED_PATTERN_IDS = new Set<string>([
  'dsu',
  'bucket-sort',
  'dp-lis',
])

export const patterns: Pattern[] = [
  ...tier1Patterns,
  ...slidingWindowPatterns,
  ...tier1StructurePatterns,
]

export function getPattern(id: string) {
  return patterns.find((pattern) => pattern.id === id)
}

export function patternsByTopic(topicId: string) {
  return patterns.filter((pattern) => pattern.topicId === topicId)
}

export function patternsByTier(tier: number) {
  return patterns.filter((pattern) => pattern.tier === tier)
}
