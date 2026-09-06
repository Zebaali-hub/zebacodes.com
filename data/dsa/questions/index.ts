import type { Question } from '../types'
import { slidingWindowQuestions } from './sliding-window'

/**
 * The question bank.
 *
 * Phase 1 ships the Sliding Window ladder only — one pattern end to end,
 * so the model can be judged in real use before ~194 more questions are
 * written against it. Add a topic file here as each one is authored.
 */
export const questions: Question[] = [...slidingWindowQuestions]

export function getQuestion(id: string) {
  return questions.find((question) => question.id === id)
}

export function questionsByPattern(patternId: string) {
  return questions
    .filter((question) => question.primaryPattern === patternId)
    .sort((a, b) => a.order - b.order)
}

export function questionsByTopic(topicId: string) {
  return questions
    .filter((question) => question.topicId === topicId)
    .sort((a, b) => a.order - b.order)
}

export function questionsByTier(tier: number) {
  return questions.filter((question) => question.tier === tier)
}
