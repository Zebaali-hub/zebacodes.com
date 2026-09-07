import { tiers } from '@/data/dsa/tiers'
import { topics } from '@/data/dsa/topics'
import { patternsByTopic } from '@/data/dsa/patterns'
import { questionsByPattern } from '@/data/dsa/questions'
import type { TierId } from '@/data/dsa/types'

/**
 * Deterministic layout for the DSA roadmap graph.
 *
 * Pure geometry, computed at build time — no client JS, no measuring.
 * Topics are placed in left/right pairs around a central spine so the
 * graph reads like a roadmap rather than a list, and each topic carries
 * its patterns as chips beneath it.
 */

export const CANVAS_WIDTH = 1000
const SPINE_X = CANVAS_WIDTH / 2

const TIER_W = 340
const TIER_H = 58
const TOPIC_W = 268
const TOPIC_H = 46
const CHIP_W = 252
const CHIP_LINE = 15
const CHIP_PAD = 9
const CHIP_GAP = 7
const TOPIC_TO_CHIPS = 14
const PAIR_GAP = 34
const TIER_GAP_BEFORE = 54
const TIER_GAP_AFTER = 40

const LEFT_X = SPINE_X - 90 - TOPIC_W
const RIGHT_X = SPINE_X + 90

/** Character budgets, tuned to the rendered box widths. */
const CHIP_CHARS = 36
const TOPIC_CHARS = 30

export type Box = {
  kind: 'tier' | 'topic' | 'pattern'
  id: string
  lines: string[]
  x: number
  y: number
  w: number
  h: number
  tier: TierId
  href?: string
  meta?: string
}

export type Edge = { d: string; tier: TierId }

export type RoadmapLayout = {
  boxes: Box[]
  edges: Edge[]
  height: number
}

/** Greedy word wrap to a character budget. Two lines maximum. */
function wrap(text: string, budget: number, maxLines = 3): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length <= budget) {
      line = candidate
    } else {
      if (line) lines.push(line)
      line = word
      if (lines.length === maxLines - 1) break
    }
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) lines.length = maxLines
  // If truncation dropped words, mark the final line.
  const joined = lines.join(' ')
  if (joined.length < text.length && lines.length === maxLines) {
    const last = lines[maxLines - 1]
    lines[maxLines - 1] = last.length > budget - 1 ? `${last.slice(0, budget - 1)}…` : `${last}…`
  }
  return lines
}

function chipHeight(lines: number): number {
  return CHIP_PAD * 2 + lines * CHIP_LINE
}

/** Total height a topic column occupies, including its pattern chips. */
function topicHeight(topicId: string): number {
  const patterns = patternsByTopic(topicId)
  if (patterns.length === 0) return TOPIC_H + TOPIC_TO_CHIPS + chipHeight(1)
  const chips = patterns.reduce(
    (sum, pattern) => sum + chipHeight(wrap(pattern.title, CHIP_CHARS).length) + CHIP_GAP, 0,
  )
  return TOPIC_H + TOPIC_TO_CHIPS + chips - CHIP_GAP
}

export function layoutRoadmap(): RoadmapLayout {
  const boxes: Box[] = []
  const edges: Edge[] = []
  let y = 20

  for (const tier of tiers) {
    const tierTopics = topics.filter((topic) => topic.tier === tier.id)

    y += TIER_GAP_BEFORE
    const tierY = y
    boxes.push({
      kind: 'tier', id: `tier-${tier.id}`, tier: tier.id,
      lines: [`TIER ${tier.id}`, tier.title],
      x: SPINE_X - TIER_W / 2, y: tierY, w: TIER_W, h: TIER_H,
      meta: `${tierTopics.length} topics`,
    })
    y += TIER_H + TIER_GAP_AFTER

    // Topics in left/right pairs so the graph stays compact.
    for (let i = 0; i < tierTopics.length; i += 2) {
      const pair = [tierTopics[i], tierTopics[i + 1]].filter(Boolean)
      const rowY = y
      const heights = pair.map((topic) => topicHeight(topic.id))
      const rowHeight = Math.max(...heights)

      pair.forEach((topic, side) => {
        const isLeft = side === 0
        const x = isLeft ? LEFT_X : RIGHT_X
        const patterns = patternsByTopic(topic.id)

        boxes.push({
          kind: 'topic', id: topic.id, tier: tier.id,
          lines: wrap(topic.title, TOPIC_CHARS, 2),
          x, y: rowY, w: TOPIC_W, h: TOPIC_H,
          meta: patterns.length > 0 ? `${patterns.length}` : undefined,
        })

        // Elbow from the spine into the topic box.
        const midY = rowY + TOPIC_H / 2
        const spineFrom = isLeft ? SPINE_X - 4 : SPINE_X + 4
        const boxEdge = isLeft ? x + TOPIC_W : x
        edges.push({
          tier: tier.id,
          d: `M ${spineFrom} ${tierY + TIER_H} V ${midY} H ${boxEdge}`,
        })

        // Pattern chips stacked beneath the topic, indented slightly.
        let chipY = rowY + TOPIC_H + TOPIC_TO_CHIPS
        const chipX = isLeft ? x + (TOPIC_W - CHIP_W) : x
        if (patterns.length === 0) {
          boxes.push({
            kind: 'pattern', id: `${topic.id}-none`, tier: tier.id,
            lines: ['Patterns pending'],
            x: chipX, y: chipY, w: CHIP_W, h: chipHeight(1),
          })
        }
        for (const pattern of patterns) {
          const lines = wrap(pattern.title, CHIP_CHARS)
          const h = chipHeight(lines.length)
          const count = questionsByPattern(pattern.id).length
          boxes.push({
            kind: 'pattern', id: pattern.id, tier: tier.id,
            lines, x: chipX, y: chipY, w: CHIP_W, h,
            href: `/roadmaps/dsa/patterns/${pattern.id}`,
            meta: count > 0 ? String(count) : undefined,
          })
          // Short connector from the topic box down the chip stack.
          edges.push({
            tier: tier.id,
            d: `M ${isLeft ? chipX - 10 : chipX + CHIP_W + 10} ${chipY + h / 2} H ${isLeft ? chipX : chipX + CHIP_W}`,
          })
          chipY += h + CHIP_GAP
        }
      })

      y = rowY + rowHeight + PAIR_GAP
    }
  }

  return { boxes, edges, height: y + 20 }
}

/** Vertical spine segments, drawn behind everything. */
export function spinePath(height: number): string {
  return `M ${SPINE_X} 20 V ${height - 20}`
}
