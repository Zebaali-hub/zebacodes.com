import { patterns, getPattern } from '@/data/dsa/patterns'
import type { Pattern } from '@/data/dsa/types'

/**
 * Prerequisite traversal over the pattern DAG.
 *
 * Edges are declared on the pattern that REQUIRES them, so a pattern owns
 * its own prerequisites and everything else here is derived. Cycles are a
 * build-time failure, not a runtime infinite loop — see the integrity test.
 */

/** Direct prerequisites, in declaration order. */
export function directPrerequisites(patternId: string): Pattern[] {
  const pattern = getPattern(patternId)
  if (!pattern) return []
  return pattern.prerequisites.map(getPattern).filter((p): p is Pattern => Boolean(p))
}

/** Every pattern that lists this one as a direct prerequisite. */
export function directUnlocks(patternId: string): Pattern[] {
  return patterns.filter((pattern) => pattern.prerequisites.includes(patternId))
}

/** Transitive closure of prerequisites, nearest first. */
export function allPrerequisites(patternId: string): Pattern[] {
  const seen = new Set<string>()
  const out: Pattern[] = []
  const queue = [...(getPattern(patternId)?.prerequisites ?? [])]

  while (queue.length > 0) {
    const id = queue.shift() as string
    if (seen.has(id)) continue
    seen.add(id)
    const pattern = getPattern(id)
    if (!pattern) continue
    out.push(pattern)
    queue.push(...pattern.prerequisites)
  }
  return out
}

/**
 * Detects cycles. Returns the offending path if one exists, else null.
 * Called by the integrity test so a bad edge fails CI rather than the page.
 */
export function findCycle(): string[] | null {
  const VISITING = 1
  const DONE = 2
  const state = new Map<string, number>()
  const path: string[] = []

  function walk(id: string): string[] | null {
    const current = state.get(id)
    if (current === DONE) return null
    if (current === VISITING) return [...path.slice(path.indexOf(id)), id]

    state.set(id, VISITING)
    path.push(id)
    for (const next of getPattern(id)?.prerequisites ?? []) {
      const cycle = walk(next)
      if (cycle) return cycle
    }
    path.pop()
    state.set(id, DONE)
    return null
  }

  for (const pattern of patterns) {
    const cycle = walk(pattern.id)
    if (cycle) return cycle
  }
  return null
}

/**
 * A learning order for `targetId`: every prerequisite, topologically
 * sorted so nothing appears before something it depends on, with the
 * target last. This is what answers "I have three weeks and one loop
 * booked — what do I actually study?".
 *
 * `known` lets an already-mastered pattern drop out of the path.
 */
export function criticalPath(targetId: string, known: Set<string> = new Set()): Pattern[] {
  const ordered: Pattern[] = []
  const placed = new Set<string>(known)

  function visit(id: string) {
    if (placed.has(id)) return
    const pattern = getPattern(id)
    if (!pattern) return
    placed.add(id)
    for (const prerequisite of pattern.prerequisites) visit(prerequisite)
    ordered.push(pattern)
  }

  visit(targetId)
  return ordered
}

/** Patterns with no unmet prerequisites, given what is already known. */
export function availableNow(known: Set<string>): Pattern[] {
  return patterns.filter(
    (pattern) =>
      !known.has(pattern.id) &&
      pattern.prerequisites.every((prerequisite) => known.has(prerequisite)),
  )
}
