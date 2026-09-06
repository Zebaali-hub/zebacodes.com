import type { Tier } from './types'

/**
 * Three cumulative tiers. Tier 2 does not replace Tier 1 and Tier 3
 * does not replace Tier 2 — a Tier 3 candidate still owes mastery of
 * everything below. lib/dsa/readiness enforces this: a tier cannot
 * report ready while a prerequisite tier carries RED or BLACK patterns.
 */
export const tiers: Tier[] = [
  {
    id: 1,
    slug: 'tier-1',
    title: 'SDE-2 Core Foundation',
    goal: 'A foundation strong enough for Java/backend SDE-2 loops, and a mandatory prerequisite for everything above.',
    exitCriteria: [
      'Read constraints and infer the plausible complexity class before writing code',
      'State a brute force and name the specific operation that makes it too slow',
      'Recognise the likely pattern on an unseen Medium with the pattern hidden',
      'Derive the optimal approach rather than recalling a memorised solution',
      'Code it correctly on the first or second pass',
      'Dry run on a small input and a degenerate one',
      'Enumerate edge cases unprompted',
      'State time and space complexity including hidden costs',
    ],
    targetIndependentRate: 0.75,
  },
  {
    id: 2,
    slug: 'tier-2',
    title: 'Big-Tech Interview Layer',
    goal: 'Depth for Amazon, Microsoft, Salesforce, Atlassian, Adobe, Apple and LinkedIn style loops, with heavy emphasis on patterns appearing in combination.',
    exitCriteria: [
      'Unseen Mediums feel routine rather than threatening',
      'Tricky Mediums are tractable within interview time',
      'Interviewer follow-ups are absorbed by adapting the existing approach, not restarting',
      'Recognise a problem as a combination of two patterns rather than searching for one label',
      'Choose between two valid approaches and justify the trade-off out loud',
    ],
    targetIndependentRate: 0.7,
  },
  {
    id: 3,
    slug: 'tier-3',
    title: 'Advanced / Top-End',
    goal: 'Higher-ceiling algorithmic reasoning for Google, Rubrik, Databricks and similar loops. Deliberately not competitive-programming trivia.',
    exitCriteria: [
      'Reason productively about an unfamiliar Medium-Hard without a known label',
      'Make progress on selected Hard problems under time pressure',
      'Decompose a problem into state and transition when no standard pattern fits',
      'Adapt to a follow-up that changes the constraint class entirely',
    ],
    targetIndependentRate: 0.6,
  },
]

export function getTier(id: number) {
  return tiers.find((tier) => tier.id === id)
}
