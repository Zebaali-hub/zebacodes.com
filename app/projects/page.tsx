'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Log Intelligence Tool',
    kicker: 'Oracle diagnostics to structured failure reports',
    problem: 'TRC files, AWR reports, and stack traces are noisy. Triage often starts with scattered clues across database, JVM, and network layers.',
    built:
      'A Spring Boot service that parses raw diagnostic artifacts, classifies failures by layer, and emits Markdown plus JSON root-cause reports for downstream tooling.',
    impact:
      'Turns production failure data into a repeatable diagnostic workflow that can plug into support or CI/CD systems.',
    tags: ['Java', 'Spring Boot', 'Oracle', 'AWR', 'TRC Parser', 'REST API'],
    github: 'https://github.com/zebacodes/log-intelligence-tool',
    accent: '#c8f000',
    code: '01',
  },
  {
    title: 'Database Stress Testing Framework',
    kicker: 'Concurrent load generation with live metrics',
    problem:
      'Database behavior changes under sustained concurrency. Manual scripts rarely capture TPS, p95/p99 latency, pool pressure, and failure classes together.',
    built:
      'A configurable Spring Boot framework using ExecutorService pools, YAML load profiles, WebSocket metrics, and post-run failure classification.',
    impact:
      'Productizes the kind of workload thinking I used at Oracle while stress-testing RDBMS behavior at billion-row scale.',
    tags: ['Java', 'Spring Boot', 'JDBC', 'ExecutorService', 'WebSocket', 'PostgreSQL'],
    github: 'https://github.com/zebacodes/db-stress-framework',
    accent: '#67e8f9',
    code: '02',
  },
  {
    title: 'Vector Search Benchmark',
    kicker: 'HNSW vs IVF vs Flat for pgvector',
    problem:
      'Vector search decisions are often made from vibes: index choice, recall, latency, and memory trade-offs need reproducible measurement.',
    built:
      'A Spring Boot benchmark suite comparing HNSW, IVFFlat, and exact search across dataset sizes, dimensions, and query profiles.',
    impact:
      'Brings Oracle vector-search benchmarking discipline into a public pgvector project with readable CSV and Markdown outputs.',
    tags: ['Java', 'Spring Boot', 'pgvector', 'PostgreSQL', 'HNSW', 'IVF'],
    github: 'https://github.com/zebacodes/vector-search-benchmark',
    accent: '#a78bfa',
    code: '03',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[360px] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(200,240,0,0.055), transparent 72%), radial-gradient(circle at 78% 8%, rgba(103,232,249,0.08), transparent 34%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-[1120px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-12 sm:mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: 'rgba(200,240,0,0.72)' }}>
            Backend systems evidence
          </p>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16 items-end">
            <h1 className="font-display text-[52px] sm:text-[72px] font-black tracking-tight leading-none" style={{ color: '#f5f1e8' }}>
              Projects that prove the depth.
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-[1.75] font-light" style={{ color: 'rgba(240,235,224,0.68)' }}>
              These are not toy CRUD apps. They are public versions of the systems thinking I built at Oracle:
              diagnostics, concurrency, benchmarking, observability, and failure behavior.
            </p>
          </div>
        </motion.header>

        <div className="grid gap-5">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              custom={i * 0.08}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="group rounded-lg border overflow-hidden"
              style={{
                borderColor: 'rgba(240,235,224,0.09)',
                background: 'linear-gradient(180deg, rgba(240,235,224,0.045), rgba(240,235,224,0.018))',
              }}
            >
              <div className="grid lg:grid-cols-[210px_1fr]">
                <aside className="p-6 sm:p-7 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'rgba(240,235,224,0.07)' }}>
                  <p className="font-display italic text-[36px] leading-none mb-6" style={{ color: project.accent }}>
                    {project.code}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'rgba(240,235,224,0.35)' }}>
                    Status
                  </p>
                  <p className="text-[14px] font-medium" style={{ color: '#f5f1e8' }}>
                    Active build
                  </p>
                </aside>

                <div className="p-6 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: project.accent }}>
                        {project.kicker}
                      </p>
                      <h2 className="font-display text-[28px] sm:text-[34px] font-bold tracking-tight leading-tight" style={{ color: '#f5f1e8' }}>
                        {project.title}
                      </h2>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center justify-center rounded-md px-4 py-2.5 text-[13px] font-medium transition-colors"
                      style={{
                        border: '1px solid rgba(240,235,224,0.14)',
                        color: 'rgba(240,235,224,0.78)',
                        background: 'rgba(10,10,10,0.4)',
                      }}
                    >
                      GitHub ↗
                    </a>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5 mb-7">
                    {[
                      ['Problem', project.problem],
                      ['Built', project.built],
                      ['Impact', project.impact],
                    ].map(([label, text]) => (
                      <div key={label} className="rounded-md border p-4" style={{ borderColor: 'rgba(240,235,224,0.07)' }}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: 'rgba(240,235,224,0.34)' }}>
                          {label}
                        </p>
                        <p className="text-[14px] leading-[1.7] font-light" style={{ color: 'rgba(240,235,224,0.66)' }}>
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1.5 rounded-full"
                        style={{
                          background: `${project.accent}12`,
                          border: `1px solid ${project.accent}22`,
                          color: project.accent,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
