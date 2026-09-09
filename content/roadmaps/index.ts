import type { Roadmap, RoadmapId, Tier, Topic, TopicRef } from '../types'
import { javaTier1 } from './java'
import { javaTier2 } from './java-tier2'
import { javaTier3 } from './java-tier3'
import { springTopics } from './spring'
import { databaseTopics } from './database'
import { hldTopics } from './hld'
import { lldTopics } from './lld'
import { buildDsaTiers } from './dsa'

function group(topics: Topic[], tiers: { level: 1 | 2 | 3; title: string; goal: string; exitCriteria: string[] }[]): Tier[] {
  return tiers.map((tier) => ({ ...tier, topics: topics.filter((topic) => topic.tier === tier.level) }))
}

const JAVA_TIERS = [
  { level: 1 as const, title: 'Core Java Foundation', goal: 'The language and library surface an SDE-2 is expected to use without hesitation.', exitCriteria: ['Choose a collection from complexity rather than habit', 'Explain the equals/hashCode contract by demonstrating a failure', 'Write a stream pipeline and justify it against a loop'] },
  { level: 2 as const, title: 'Backend Java Depth', goal: 'Internals and concurrency — where SDE-2 interviews actually probe.', exitCriteria: ['Walk through HashMap put including resize and treeification', 'Reproduce, diagnose and fix a race condition three ways', 'Size a thread pool from measured service time and defend it'] },
  { level: 3 as const, title: 'Advanced / Selective', goal: 'Depth taken on demand, not breadth for its own sake.', exitCriteria: ['Read a thread dump and a heap dump under time pressure'] },
]

const SPRING_TIERS = [
  { level: 1 as const, title: 'Core Spring Boot', goal: 'Build a correct service: container, HTTP boundary, persistence.', exitCriteria: ['Explain why constructor injection is the default', 'Ship an endpoint with a real error contract'] },
  { level: 2 as const, title: 'Production Spring', goal: 'The behaviour that only shows up under load and failure.', exitCriteria: ['Explain self-invocation and demonstrate it', 'Detect and fix an N+1 by counting queries', 'Justify the outbox from the dual-write problem'] },
  { level: 3 as const, title: 'Framework Internals', goal: 'Selective depth into how the framework does what it does.', exitCriteria: [] },
]

const DATABASE_TIERS = [
  { level: 1 as const, title: 'Database Foundation', goal: 'Relational model, SQL, and the transaction as a unit of work.', exitCriteria: ['State what each letter of ACID actually promises'] },
  { level: 2 as const, title: 'Concurrency and Performance', goal: 'Isolation, MVCC, indexing and plans — the SDE-2 database interview.', exitCriteria: ['Give a concrete interleaving for each read anomaly', 'Read EXPLAIN ANALYZE and spot a bad estimate', 'Choose optimistic or pessimistic locking and defend it'] },
  { level: 3 as const, title: 'Internals and Distribution', goal: 'Selected depth, including approximate search.', exitCriteria: ['Reason about recall versus latency as a measurable trade'] },
]

const HLD_TIERS = [
  { level: 1 as const, title: 'System Design Foundation', goal: 'Requirements, components, and why each one exists.', exitCriteria: ['Turn a vague ask into functional and non-functional requirements', 'Estimate concurrency from arrival rate and service time'] },
  { level: 2 as const, title: 'SDE-2 Design', goal: 'Async architecture, consistency, and designing for failure.', exitCriteria: ['Design an event-driven flow and name its delivery guarantee', 'Say what fails first under 10x load'] },
  { level: 3 as const, title: 'High-Bar Design', goal: 'Multi-region, hot partitions, large-scale redesign.', exitCriteria: [] },
]

const LLD_TIERS = [
  { level: 1 as const, title: 'Design Thinking', goal: 'Requirements to objects, with a reason for every class.', exitCriteria: ['Start with clarifying questions rather than classes'] },
  { level: 2 as const, title: 'Designing for Change', goal: 'Absorb a new requirement by adding code, not editing it.', exitCriteria: ['Add a requirement mid-design without reworking existing classes'] },
  { level: 3 as const, title: 'Machine Coding', goal: 'Ambiguity, concurrency and time pressure together.', exitCriteria: [] },
]

export const roadmaps: Roadmap[] = [
  { id: 'dsa', title: 'DSA', scope: 'Pattern recognition, prerequisite depth, and deliberate practice', status: 'published', tiers: buildDsaTiers() },
  { id: 'java', title: 'Java', scope: 'Language, collections, JVM and concurrency', status: 'published', tiers: group([...javaTier1, ...javaTier2, ...javaTier3], JAVA_TIERS) },
  { id: 'spring', title: 'Spring Boot', scope: 'Container, persistence, transactions and async', status: 'published', tiers: group(springTopics, SPRING_TIERS) },
  { id: 'database', title: 'Database', scope: 'Transactions, concurrency, indexing and query execution', status: 'published', tiers: group(databaseTopics, DATABASE_TIERS) },
  { id: 'hld', title: 'System Design', scope: 'Requirements, scaling, async architecture and failure', status: 'drafting', tiers: group(hldTopics, HLD_TIERS) },
  { id: 'lld', title: 'LLD', scope: 'Responsibility assignment and designing for change', status: 'drafting', tiers: group(lldTopics, LLD_TIERS) },
]

export const allTopics: Topic[] = roadmaps.flatMap((r) => r.tiers.flatMap((t) => t.topics))

export function getRoadmap(id: string) {
  return roadmaps.find((r) => r.id === id)
}

export function resolveTopic(ref: TopicRef): Topic | undefined {
  return allTopics.find((t) => t.roadmap === ref.roadmap && t.id === ref.topic)
}

export function topicsIn(roadmap: RoadmapId): Topic[] {
  return allTopics.filter((t) => t.roadmap === roadmap)
}
