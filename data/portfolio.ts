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
}

export const projects: Project[] = [
  {
    id: 'orderflow',
    name: 'OrderFlow',
    eyebrow: 'Flagship system · Event-driven backend',
    summary: 'A food-delivery backend where order state moves through independent services over Kafka, with synchronous HTTP kept at the edge.',
    problem: 'Coordinate payment, restaurant notification, delivery assignment, and tracking without turning one request into a fragile chain of service calls.',
    architecture: 'Spring Cloud Gateway fronts seven Spring Boot services. Order Service writes state and an outbox record in one transaction; Kafka carries payment, order, delivery, and location events. Each stateful service owns PostgreSQL data.',
    decisions: ['Transactional outbox for atomic order events', 'Idempotency keys and consumer deduplication', 'Redis token-bucket limits, menu cache, and driver GEO search'],
    failures: 'Failed payments cancel orders; outbox publishing retries three times before marking an event failed. The repository documents that Jaeger is provisioned, but service trace export is not implemented yet.',
    learned: 'Reliability comes from explicit state transitions and replay-safe boundaries, not from assuming every dependency is available.',
    stack: ['Java 17', 'Spring Boot 3.2', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Prometheus'],
    href: 'https://github.com/Zebaali-hub/orderflow',
    visual: 'topology',
  },
  {
    id: 'db-stress',
    name: 'DB Stress Framework',
    eyebrow: 'Engineering tool · Concurrent JDBC workloads',
    summary: 'A configurable Spring Boot tool for applying concurrent load to JDBC databases and watching throughput, tail latency, and failures as they happen.',
    problem: 'Make database behavior under concurrency repeatable and inspectable instead of relying on one-off scripts.',
    architecture: 'Each test gets an isolated HikariCP pool and fixed worker executor. A metrics collector publishes one-second windows over WebSocket; results persist separately from the target database and export to JSON or PDF.',
    decisions: ['Per-test pool isolation', 'Strategy-based workload profiles', 'Bounded final latency samples and graceful executor shutdown'],
    failures: 'Tests move through a defined lifecycle and share a stop signal. Errors are counted, classified, and surfaced alongside latency rather than discarded.',
    learned: 'A useful load tool explains the workload and its failure modes; a large throughput number alone says very little.',
    stack: ['Java 17', 'Spring Boot 3.2', 'JDBC', 'HikariCP', 'WebSocket', 'PostgreSQL', 'Docker'],
    href: 'https://github.com/Zebaali-hub/db-stress-framework',
    visual: 'load',
  },
  {
    id: 'log-intelligence',
    name: 'Log Intelligence Tool',
    eyebrow: 'Diagnostic workflow · Structured analysis',
    summary: 'A rule-driven analysis service for Oracle traces, Java and PostgreSQL logs, AWR reports, and SQL Monitor output.',
    problem: 'Turn scattered production evidence into a repeatable path from raw diagnostic data to patterns, severity, likely cause, and remediation guidance.',
    architecture: 'A Spring MVC API feeds type detection, specialized parsers, pattern matching, layer classification, and root-cause analysis. Uploaded files run on a bounded async executor; PostgreSQL stores history.',
    decisions: ['Format-specific parsers behind one pipeline', 'Async file processing with pollable status', 'Deterministic patterns and explainable remediation text'],
    failures: 'Uploads begin as PENDING and transition to COMPLETED or FAILED. Validation and structured API errors keep bad inputs out of the parser pipeline.',
    learned: 'Diagnostic automation is credible when every conclusion can be traced back to evidence in the input.',
    stack: ['Java 17', 'Spring Boot 3.2', 'PostgreSQL', 'Flyway', 'PDFBox', 'Docker'],
    href: 'https://github.com/Zebaali-hub/log-intelligence-tool',
    visual: 'logs',
  },
  {
    id: 'job-radar',
    name: 'Job Radar',
    eyebrow: 'Personal product · Local-first workflow',
    summary: 'A local-first application that discovers backend roles from public sources, explains resume-to-job fit, and tracks an application pipeline.',
    problem: 'Replace scattered tabs and spreadsheets with one private workflow for discovery, evidence-based matching, and application state.',
    architecture: 'A Java 21 modular monolith owns ingestion, matching, resume intelligence, and tracking over PostgreSQL and pgvector. A Next.js 16 frontend provides the workspace; Docker Compose runs the product locally.',
    decisions: ['Local data, no accounts or telemetry', 'Explainable scoring with cited job and resume lines', 'Public APIs first; assisted capture is visible and consent-gated'],
    failures: 'Source adapters normalize and reject irrelevant records before persistence. Optional AI providers are isolated behind an SPI; the core workflow works without one.',
    learned: 'Automation should preserve user agency, especially when websites, personal data, and consequential decisions are involved.',
    stack: ['Java 21', 'Spring Boot 3.3', 'Next.js 16', 'PostgreSQL', 'pgvector', 'Playwright', 'Docker'],
    href: 'https://github.com/Zebaali-hub/jobradar',
    visual: 'pipeline',
  },
  {
    id: 'self-drill',
    name: 'Self Drill',
    eyebrow: 'Learning system · Deterministic question engine',
    summary: 'A browser-only interview practice tool that converts resume evidence into structured questions without an API or backend.',
    problem: 'Generate practice that responds to a person’s actual projects and trade-offs instead of serving the same static list or hallucinating through an LLM.',
    architecture: 'Client-side PDF extraction and lightweight NLP produce reviewable resume data. Five pure generation techniques build tiered questions; localStorage keeps practice history and revisit queues.',
    decisions: ['Human confirmation before generation', 'Rule-based techniques with maintained dictionaries', 'Static fundamentals separated from resume-driven rounds'],
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

export function getProject(id: string) {
  return projects.find((project) => project.id === id)
}

export const technologies = [
  { group: 'Backend', items: ['Java', 'Spring Boot', 'REST APIs'] },
  { group: 'Data', items: ['PostgreSQL', 'Oracle Database', 'Redis'] },
  { group: 'Messaging', items: ['Kafka'] },
  { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Linux'] },
  { group: 'Observability', items: ['Grafana', 'Prometheus'] },
  { group: 'Engineering', items: ['Git', 'Maven', 'Jenkins'] },
]
