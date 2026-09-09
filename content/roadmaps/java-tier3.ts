import type { Topic } from '../types'

/** Java — Tier 3. Selective by design: depth taken on demand, not breadth. */
export const javaTier3: Topic[] = [
  {
    id: 'advanced-concurrency', roadmap: 'java', tier: 3,
    title: 'Advanced concurrency primitives',
    summary: 'Semaphore, CountDownLatch, CyclicBarrier, StampedLock, ForkJoinPool — and the coordination problem each one exists for.',
    whyItMatters: 'Beyond a lock and a pool, coordination becomes the problem. These are not trivia: each maps to a real backend situation, and choosing the wrong one produces code that works until it is loaded.',
    whatToLearn: [
      'Semaphore as a permit count — bounding concurrent access to a scarce resource',
      'CountDownLatch: one-shot, wait for N things to finish',
      'CyclicBarrier: reusable, all parties wait for each other',
      'StampedLock and optimistic reads, and why it is not reentrant',
      'ForkJoinPool and work stealing — what parallel streams actually run on',
      'Virtual threads: cheap blocking, and why pool sizing changes shape entirely',
    ],
    dependencies: [{ roadmap: 'java', topic: 'executor-service' }],
    nextSteps: [],
    howDeep: 'awareness',
    interviewQuestions: [
      { q: 'CountDownLatch or CyclicBarrier?', expects: 'Latch is one-shot and the waiter is separate from the workers; barrier is reusable and every party waits for the others. A concrete use for each is the strong answer.' },
      { q: 'What do virtual threads change about pool sizing?', expects: 'Blocking becomes cheap, so the pool-size-versus-IO-wait calculus largely dissolves for blocking workloads — though bounded concurrency is still needed to protect downstream systems.' },
    ],
    systemContext: 'A Semaphore bounding concurrent calls to a fragile third-party API is backpressure at the method level — the same principle as a bounded queue, applied to a dependency rather than a pool.',
    related: [
      { to: { roadmap: 'hld', topic: 'backpressure' }, kind: 'implements', why: 'A permit-bounded Semaphore is load shedding applied to a single downstream dependency.' },
      { to: { roadmap: 'java', topic: 'executor-service' }, kind: 'requires', why: 'These coordinate work that a pool is executing; without the pool model they have nothing to coordinate.' },
    ],
    practice: {
      intent: 'Match each primitive to the situation it was built for.',
      exercises: [
        { title: 'Bound a fragile dependency', detail: 'Wrap a client in a Semaphore of 5 permits. Fire 100 concurrent calls and show only 5 are ever in flight, with the rest waiting rather than failing.' },
        { title: 'Latch versus barrier', detail: 'Implement a parallel batch load twice — once with CountDownLatch, once with CyclicBarrier — and explain which fits and why the other is awkward.' },
      ],
    },
  },
  {
    id: 'diagnostics', roadmap: 'java', tier: 3,
    title: 'Production diagnostics',
    summary: 'Thread dumps, heap dumps, JFR — reading a live JVM under pressure.',
    whyItMatters: 'This is the skill that separates people who have run services from people who have written them. The evidence is always there; the question is whether you can read it.',
    whatToLearn: [
      'jstack and thread states — RUNNABLE, BLOCKED, WAITING and what each implies',
      'Reading the deadlock section the JVM writes for you',
      'Heap dumps and dominator trees for retention, not allocation',
      'Java Flight Recorder for low-overhead continuous profiling',
      'Correlating GC logs with latency percentiles',
    ],
    dependencies: [{ roadmap: 'java', topic: 'gc' }, { roadmap: 'java', topic: 'threads-and-safety' }],
    nextSteps: [],
    howDeep: 'awareness',
    interviewQuestions: [
      { q: 'A service is at 100% CPU but throughput has collapsed. First three things you look at?', expects: 'Thread dump for a spin or lock convoy, GC logs for a collection loop, and whether the CPU is in application code or the collector.' },
      { q: 'Memory keeps growing but no OOM. What do you take and what do you look for?', expects: 'A heap dump, then the dominator tree — retention paths, not allocation counts.' },
    ],
    systemContext: 'This is the toolkit behind production incident response — the layer at which "the service is slow" becomes a specific, fixable cause.',
    related: [{ to: { roadmap: 'java', topic: 'gc' }, kind: 'requires', why: 'Interpreting a pause pattern requires knowing what the collector is doing and when.' }],
  },
]
