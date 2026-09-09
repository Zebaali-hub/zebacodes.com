import type { Topic, Tier } from '../types'
import { tiers as dsaTiers } from '@/data/dsa/tiers'
import { topics as dsaTopics } from '@/data/dsa/topics'
import { patternsByTopic } from '@/data/dsa/patterns'
import { questionsByPattern } from '@/data/dsa/questions'

/**
 * DSA adapter.
 *
 * The DSA curriculum is deliberately NOT flattened into the generic Topic
 * shape. Its real content is the Pattern layer — recognition signals,
 * brute-force smell, the prerequisite DAG, the ordered question ladders —
 * so a DSA topic carries `patternIds` and the detail panel renders those
 * patterns in full. Nothing is invented here: no fabricated interview
 * questions, no synthesised prose. Fields the source data does not have
 * are left empty rather than filled with derived filler.
 */
export function buildDsaTiers(): Tier[] {
  return dsaTiers.map((tier) => ({
    level: tier.id,
    title: tier.title,
    goal: tier.goal,
    exitCriteria: tier.exitCriteria,
    topics: dsaTopics
      .filter((topic) => topic.tier === tier.id)
      .map((topic): Topic => {
        const patterns = patternsByTopic(topic.id)
        const questionCount = patterns.reduce(
          (sum, pattern) => sum + questionsByPattern(pattern.id).length, 0,
        )

        return {
          id: topic.id,
          roadmap: 'dsa',
          tier: tier.id,
          title: topic.title,
          summary: topic.summary,

          whyItMatters: topic.summary,
          whatToLearn: patterns.map((pattern) => pattern.purpose),
          dependencies: [],
          nextSteps: [],

          howDeep: tier.id === 1 ? 'deep' : 'working',
          // Deliberately empty. DSA assessment lives in the pattern-level
          // recognition signals and the blind exit tests, not in a list of
          // questions I would have to invent for the topic.
          interviewQuestions: [],

          related: [],
          patternIds: patterns.map((pattern) => pattern.id),

          practice: questionCount > 0
            ? {
                intent: 'Work the ladder in order — foundation, core, variation, advanced, combination, then the blind exit test.',
                exercises: patterns
                  .filter((pattern) => questionsByPattern(pattern.id).length > 0)
                  .map((pattern) => ({
                    title: pattern.title,
                    detail: `${questionsByPattern(pattern.id).length} curated problems, ordered by what each one teaches rather than by difficulty.`,
                  })),
              }
            : undefined,
        }
      }),
  }))
}
