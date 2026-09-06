const highlights = [
  'Modified Oracle RDBMS source code to ship 4 production database features across the 19RU, 23RU, 23ai, and 26.1 releases — including parser-level support for nested CTEs, enabling MongoDB aggregation pipeline translation to Oracle SQL',
  'Built Oracle’s first parameterized vector-search workload engine — 500+ HNSW/IVF configurations measuring recall@k, throughput, and p50/p95/p99 latency at billion-row scale. Adopted org-wide.',
  'Engineered distributed validation infrastructure processing 5 billion rows across Oracle RAC, Exadata, and Exascale with 100 concurrent database instances, surfacing MVCC edge cases and deadlock patterns that fed Oracle 23ai hardening',
  'Sole responder for 10+ Fortune 500 production incidents across banking, pharmaceutical, and industrial customers',
  'Resolved 200+ defects and shipped 13 production fixes',
]

export function Experience() {
  return (
    <section className="rf-experience" id="experience" aria-labelledby="rf-experience-heading">
      <div className="site-container">
        <h2 id="rf-experience-heading" className="rf-section-title"><span>Experience</span></h2>
        <article className="rf-role">
          <header>
            <h3>Software Engineer II <span>·</span> Oracle India Pvt. Ltd.</h3>
            <p className="rf-role-meta">Oracle Server Technologies Group — Oracle RDBMS, Noida</p>
            <p className="rf-role-dates">Jul 2022 — Apr 2026</p>
          </header>
          <ul>{highlights.map((line) => <li key={line}>{line}</li>)}</ul>
        </article>
        <p className="rf-role-prior">
          Previously: Software Engineer Intern at Wabtec Corporation (2021—2022) — Java backend data
          pipelines and SQL Server integrations for rail-logistics workflows.
        </p>
      </div>
    </section>
  )
}
