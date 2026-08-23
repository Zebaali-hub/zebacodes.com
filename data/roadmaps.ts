export type RoadmapStep = {
  id: string
  title: string
  summary: string
  priority: 'foundation' | 'core' | 'advanced'
  prerequisites: string[]
  subtopics: string[]
  relatedWriting: string[]
  resources: { label: string; url: string; kind: 'learn' | 'practice' | 'notes' | 'questions' }[]
  nextStep: string
}

export type Roadmap = {
  slug: string
  title: string
  scope: string
  status: 'planned' | 'in-progress' | 'published'
  steps: RoadmapStep[]
}

const step = (title: string, summary: string, priority: RoadmapStep['priority'] = 'core'): RoadmapStep => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), title, summary, priority,
  prerequisites: [], subtopics: [], relatedWriting: [], resources: [], nextStep: '',
})

const path = (items: [string, string, RoadmapStep['priority']?][]) => items.map((item, index) => ({
  ...step(...item),
  prerequisites: index ? [items[index - 1][0]] : [],
  nextStep: items[index + 1]?.[0] ?? 'Apply the path through projects and review.',
}))

export const roadmaps: Roadmap[] = [
  { slug: 'dsa', title: 'DSA', scope: 'Patterns, reasoning, and deliberate practice', status: 'published', steps: path([
    ['Foundations', 'Complexity, decomposition, and deliberate practice.', 'foundation'], ['Arrays & Hashing', 'Indexing, frequency maps, sets, and lookup trade-offs.'],
    ['Pointers & Windows', 'Two pointers, sliding windows, and prefix sums.'], ['Binary Search', 'Search sorted spaces and monotonic answer ranges.'],
    ['Linear Structures', 'Linked lists, stacks, queues, and monotonic variants.'], ['Trees & Heaps', 'Traversal, recursion, trees, and priority queues.'],
    ['Graphs & Backtracking', 'Model relationships and explore constrained state.'], ['Dynamic Programming', 'Define state for overlapping subproblems.', 'advanced'],
  ]) },
  { slug: 'java', title: 'Java', scope: 'Language mechanics through backend relevance', status: 'published', steps: path([
    ['Fundamentals & OOP', 'Types, objects, interfaces, and composition.', 'foundation'], ['Collections', 'Contracts, complexity, equality, hashing, and iteration.'],
    ['Exceptions & Modern Java', 'Error boundaries, streams, lambdas, records, and optionals.'], ['JVM, Memory & GC', 'Bytecode, runtime memory, references, and collection behavior.'],
    ['Multithreading', 'Threads, lifecycle, coordination, and shared-state hazards.'], ['Concurrency', 'Executors, concurrent collections, atomics, and safe design.', 'advanced'],
    ['Advanced Java', 'I/O, reflection, profiling, and diagnostics.', 'advanced'],
  ]) },
  { slug: 'spring-boot', title: 'Spring Boot', scope: 'Application design and production behavior', status: 'published', steps: path([
    ['Spring Core', 'Beans, dependency injection, configuration, and lifecycle.', 'foundation'], ['REST APIs', 'HTTP semantics, validation, and error contracts.'],
    ['Persistence', 'JPA/Hibernate boundaries, mapping, and query behavior.'], ['Transactions', 'Atomic work, propagation, isolation, and failure.'],
    ['Security', 'Authentication, authorization, and secure defaults.'], ['Testing', 'Unit, slice, integration, and container-backed tests.'],
    ['Observability', 'Logs, metrics, traces, health, and operational signals.'], ['Microservice Fundamentals', 'Boundaries, communication, resilience, and ownership.', 'advanced'],
  ]) },
  { slug: 'database', title: 'Database', scope: 'SQL, internals, concurrency, and performance', status: 'published', steps: path([
    ['Relational Foundations', 'Tables, relationships, keys, and relational reasoning.', 'foundation'], ['SQL', 'Query, join, aggregate, and modify data.'],
    ['Data Modeling', 'Normalization, constraints, and schema evolution.'], ['Indexes', 'Access paths, selectivity, and write/read trade-offs.'],
    ['Transactions & ACID', 'Atomicity, consistency, isolation, and durability.'], ['Isolation & Locking', 'Visibility, conflicts, deadlocks, and MVCC.'],
    ['Execution & Optimization', 'Read plans, measure queries, and fix bottlenecks.', 'advanced'], ['Distributed Data', 'Replication, partitioning, consistency, and failure.', 'advanced'],
  ]) },
  { slug: 'system-design', title: 'System Design', scope: 'Requirements, trade-offs, and failure', status: 'published', steps: path([
    ['Foundations', 'Requirements, constraints, estimates, and boundaries.', 'foundation'], ['Networking & APIs', 'Protocols, latency, contracts, and idempotency.'],
    ['Data & Caching', 'Choose stores and manage cache correctness.'], ['Traffic Distribution', 'Load balancing, scaling, and backpressure.'],
    ['Messaging', 'Queues, streams, delivery semantics, and async workflows.'], ['Consistency & Availability', 'Make trade-offs under partitions and failure.'],
    ['Observability & Reliability', 'Detect, diagnose, recover, and learn.'], ['HLD Practice', 'Build reviewable end-to-end designs.', 'advanced'],
  ]) },
  { slug: 'backend-engineering', title: 'Backend Engineering', scope: 'A connected path across runtime, data, systems, and operations', status: 'published', steps: path([
    ['Java', 'Build reliable language and runtime foundations.', 'foundation'], ['Spring & REST', 'Design services and clear HTTP contracts.'],
    ['Database', 'Model, query, transact, and tune data.'], ['Concurrency', 'Control shared state, throughput, and resources.'],
    ['Messaging & Caching', 'Use asynchronous flow and fast state safely.'], ['Testing', 'Verify units, integrations, and dependencies.'],
    ['Containers & Kubernetes', 'Package services and learn orchestration fundamentals.', 'advanced'], ['Observability', 'Operate with useful signals.', 'advanced'],
    ['Distributed Systems & Design', 'Reason about scale, coordination, and failure.', 'advanced'],
  ]) },
]

const javaResource = 'https://github.com/Zebaali-hub/java-backend-engineering'
for (const roadmap of roadmaps) if (roadmap.slug === 'java' || roadmap.slug === 'backend-engineering') {
  roadmap.steps[0].resources.push({ label: 'Java Backend Engineering', url: javaResource, kind: 'learn' })
}

export function getRoadmap(slug: string) {
  return roadmaps.find((roadmap) => roadmap.slug === slug)
}
