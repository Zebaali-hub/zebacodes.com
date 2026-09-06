export type Project = {
  id: string
  name: string
  eyebrow: string
  summary: string
  problem: string
  architecture: string
  decisions: string[]
  failures: string
  learned: string
  stack: string[]
  href: string
  visual: 'topology' | 'load' | 'logs' | 'pipeline' | 'loop' | 'resource'
  /** Featured on the homepage in problem / approach / outcome form. */
  featured?: boolean
  /** One-line problem statement used on the homepage card. */
  tagline?: string
  approach?: string
  outcome?: string
  /** Inline SVG architecture diagram rendered on the homepage card. */
  diagram?: 'stress' | 'orderflow' | 'logs'
  /** Folder under public/projects/ scanned for screenshots at build time. */
  assetDir?: string
}

export const projects: Project[] = [
  {
    id: 'db-stress',
    name: 'Database Stress Testing Framework',
    eyebrow: 'Engineering tool · Concurrent JDBC workloads',
    summary: 'A configurable Spring Boot tool for applying concurrent load to JDBC databases and watching throughput, tail latency, and failures as they happen.',
    featured: true,
    diagram: 'stress',
    assetDir: 'db-stress',
    tagline: 'Database performance regressions are hard to catch because you cannot compare runs reliably.',
    problem: 'Database performance regressions are hard to catch because you cannot compare runs reliably — different load, different data, no plan-level visibility.',
    approach: 'A configurable JDBC load-testing engine with execution-plan capture per query, slow-query identification against configurable thresholds, index vs no-index comparison runs, and connection-pool exhaustion testing under varying concurrency.',
    outcome: 'Repeatable run-over-run comparison with per-query p50/p95/p99 latency, TPS, and error rate — instrumented end to end with Prometheus metrics, Grafana dashboards, and OpenTelemetry tracing across query execution paths.',
    architecture: 'Each test gets an isolated HikariCP pool and fixed worker executor. A metrics collector publishes one-second windows over WebSocket; results persist separately from the target database and export to JSON or PDF.',
    decisions: ['Per-test pool isolation', 'Strategy-based workload profiles', 'Execution-plan capture per query', 'Bounded final latency samples and graceful executor shutdown'],
    failures: 'Tests move through a defined lifecycle and share a stop signal. Errors are counted, classified, and surfaced alongside latency rather than discarded.',
    learned: 'A useful load tool explains the workload and its failure modes; a large throughput number alone says very little.',
    stack: ['Java 17', 'Spring Boot', 'JDBC', 'Redis', 'WebSocket', 'Prometheus', 'Grafana', 'OpenTelemetry'],
    href: 'https://github.com/Zebaali-hub/db-stress-framework',
    visual: 'load',
  },
  {
    id: 'orderflow',
    name: 'OrderFlow',
    eyebrow: 'Event-driven delivery platform',
    summary: 'A food-delivery backend where order state moves through independent services over Kafka, with synchronous HTTP kept at the edge.',
    featured: true,
    diagram: 'orderflow',
    assetDir: 'orderflow',
    tagline: 'Distributed order flows fail in ways monoliths do not — partial failures, duplicate events, lost messages.',
    problem: 'Distributed order flows fail in ways monoliths do not — partial failures, duplicate events, lost messages between database commit and message publish.',
    approach: 'Six Spring Boot microservices with Saga-based order orchestration over Kafka using choreography, a transactional outbox to eliminate the dual-write problem, idempotent consumers with retry and DLQ, Redis GEO for driver matching, and WebSocket live tracking.',
    outcome: 'Full order lifecycle verified end to end in ~1.3 seconds, including the failure path — a payment decline correctly compensating to CANCELLED. Deployed on Kubernetes with health probes and horizontal autoscaling, with Prometheus/Grafana/OpenTelemetry observability across all services.',
    architecture: 'Spring Cloud Gateway fronts the Spring Boot services. Order Service writes state and an outbox record in one transaction; Kafka carries payment, order, delivery, and location events. Each stateful service owns its PostgreSQL data.',
    decisions: ['Transactional outbox for atomic order events', 'Idempotency keys and consumer deduplication', 'Saga choreography with compensating transactions', 'Redis token-bucket limits, menu cache, and driver GEO search'],
    failures: 'Failed payments compensate the order to CANCELLED; outbox publishing retries before routing to a dead-letter queue. Consumers are idempotent so replays are safe.',
    learned: 'Reliability comes from explicit state transitions and replay-safe boundaries, not from assuming every dependency is available.',
    stack: ['Java 17', 'Spring Boot 3.2', 'Kafka', 'PostgreSQL', 'Redis', 'Kubernetes', 'Docker', 'Prometheus', 'Grafana', 'OpenTelemetry'],
    href: 'https://github.com/Zebaali-hub/orderflow',
    visual: 'topology',
  },
  {
    id: 'log-intelligence',
    name: 'Log Intelligence Tool',
    eyebrow: 'Diagnostic workflow · Structured analysis',
    summary: 'A rule-driven analysis service that correlates database traces, kernel errors, and Java stack traces into structured root-cause reports.',
    featured: true,
    diagram: 'logs',
    assetDir: 'log-intelligence',
    tagline: 'Incident triage means correlating signals that live in different places, manually, under time pressure.',
    problem: 'Production incident triage means correlating signals that live in different places — application logs, database traces, kernel errors — and doing it manually under time pressure.',
    approach: 'A REST service that parses database and kernel logs, performance reports, execution traces, and Java stack traces, correlates signals across application, database, and kernel layers, and classifies failures by layer.',
    outcome: 'Structured root-cause reports across 7 failure layers, built directly from four years of Fortune 500 production incident analysis. Instrumented with Prometheus, Grafana, and OpenTelemetry across the analysis pipeline.',
    architecture: 'A Spring MVC API feeds type detection, specialized parsers, pattern matching, layer classification, and root-cause analysis. Uploaded files run on a bounded async executor; PostgreSQL stores history.',
    decisions: ['Format-specific parsers behind one pipeline', 'Async file processing with pollable status', 'Deterministic patterns and explainable remediation text'],
    failures: 'Uploads begin as PENDING and transition to COMPLETED or FAILED. Validation and structured API errors keep bad inputs out of the parser pipeline.',
    learned: 'Diagnostic automation is credible when every conclusion can be traced back to evidence in the input.',
    stack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'REST', 'Docker', 'Prometheus', 'Grafana', 'OpenTelemetry'],
    href: 'https://github.com/Zebaali-hub/log-intelligence-tool',
    visual: 'logs',
  },
  {
    id: 'job-radar',
    name: 'Job Radar',
    eyebrow: 'Personal product · Local-first workflow',
    summary: 'A local-first application that discovers backend roles from public sources, explains resume-to-job fit, and tracks an application pipeline.',
    problem: 'Replace scattered tabs and spreadsheets with one private workflow for discovery, evidence-based matching, and application state.',
    architecture: 'A Java 21 modular monolith owns ingestion, matching, resume intelligence, and tracking over PostgreSQL and pgvector. A Next.js frontend provides the workspace; Docker Compose runs the product locally.',
    decisions: ['Local data, no accounts or telemetry', 'Explainable scoring with cited job and resume lines', 'Public APIs first; assisted capture is visible and consent-gated'],
    failures: 'Source adapters normalize and reject irrelevant records before persistence. Optional AI providers are isolated behind an SPI; the core workflow works without one.',
    learned: 'Automation should preserve user agency, especially when websites, personal data, and consequential decisions are involved.',
    stack: ['Java 21', 'Spring Boot 3.3', 'Next.js', 'PostgreSQL', 'pgvector', 'Playwright', 'Docker'],
    href: 'https://github.com/Zebaali-hub/jobradar',
    visual: 'pipeline',
  },
  {
    id: 'self-drill',
    name: 'Self Drill',
    eyebrow: 'Learning system · Deterministic question engine',
    summary: 'A browser-only interview practice tool that converts structured evidence into tiered questions without an API or backend.',
    problem: 'Generate practice that responds to a person’s actual projects and trade-offs instead of serving the same static list or hallucinating through an LLM.',
    architecture: 'Client-side PDF extraction and lightweight NLP produce reviewable structured data. Five pure generation techniques build tiered questions; localStorage keeps practice history and revisit queues.',
    decisions: ['Human confirmation before generation', 'Rule-based techniques with maintained dictionaries', 'Static fundamentals separated from evidence-driven rounds'],
    failures: 'No upload leaves the browser and no network service is required. Users can correct extraction before it influences a practice session.',
    learned: 'A deterministic engine can still feel personal when its rules model the right evidence and trade-offs.',
    stack: ['React 19', 'TypeScript', 'Vite', 'pdf.js', 'compromise', 'localStorage'],
    href: 'https://github.com/Zebaali-hub/selfdrill',
    visual: 'loop',
  },
  {
    id: 'java-backend-engineering',
    name: 'Java Backend Engineering',
    eyebrow: 'Building in public · Community learning resource',
    summary: 'A practical, staged guide to Java backend engineering with reviewed explanations, runnable Java examples, interview prompts, and explicit module readiness.',
    problem: 'Backend learning material is often fragmented or presented as disconnected syntax. This resource connects Java mechanics to production concerns and makes unfinished areas visible.',
    architecture: 'A documentation-first repository organizes the learning path into numbered modules. Ready modules pair concise explanations with standalone Java 17 examples, verification commands, and interview question banks.',
    decisions: ['Publish modules only after examples and links are verified', 'Keep runnable examples independent of frameworks', 'Separate ready material from the public roadmap'],
    failures: 'The resource is intentionally incomplete. Module status is explicit, and planned sections are not presented as finished educational material.',
    learned: 'A trustworthy learning resource needs a visible quality bar and progression model as much as it needs technical content.',
    stack: ['Java 17+', 'JVM', 'Collections', 'Concurrency', 'Markdown'],
    href: 'https://github.com/Zebaali-hub/java-backend-engineering',
    visual: 'resource',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProject(id: string) {
  return projects.find((project) => project.id === id)
}

export const capabilities = [
  {
    title: 'Database internals',
    body: 'Oracle RDBMS source code — SQL parser, query transformation, execution plan analysis, access-path and index selection, MVCC, B-tree and hash indexing.',
    items: ['SQL parser', 'Query transformation', 'Execution plans', 'Access-path selection', 'MVCC', 'B-tree · hash indexing'],
  },
  {
    title: 'Vector search & AI infrastructure',
    body: 'HNSW and IVF index behavior, recall@k versus latency tradeoffs, workload characterization at billion-row scale, pgvector.',
    items: ['HNSW · IVF', 'recall@k vs latency', 'Workload characterization', 'Billion-row scale', 'pgvector'],
  },
  {
    title: 'Distributed backend systems',
    body: 'Java 17, Spring Boot, Kafka event-driven architecture, Redis, Kubernetes, and Prometheus/Grafana/OpenTelemetry observability.',
    items: ['Java 17 · Spring Boot', 'Kafka', 'Redis', 'Kubernetes', 'Prometheus · Grafana', 'OpenTelemetry'],
  },
]

export const technologies = [
  { group: 'Backend', items: ['Java', 'Spring Boot', 'REST APIs'] },
  { group: 'Data', items: ['PostgreSQL', 'Oracle Database', 'Redis'] },
  { group: 'Messaging', items: ['Kafka'] },
  { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Linux'] },
  { group: 'Observability', items: ['Grafana', 'Prometheus', 'OpenTelemetry'] },
  { group: 'Engineering', items: ['Git', 'Maven', 'Jenkins'] },
]
