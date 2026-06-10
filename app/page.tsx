import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getCategoryConfig } from '@/lib/categories'
import { NewsletterForm } from '@/components/NewsletterForm'
import StackSection from '@/components/StackSection'

const oracleBullets = [
  "Architected Java concurrency frameworks stress-testing Oracle RDBMS at 5B rows across RAC, Exadata, and Exascale — surfacing deadlocks, MVCC edge cases, and kernel failures that fed into RDBMS 23ai hardening.",
  "Built Oracle's first parameterized vector search benchmarking engine — 500+ HNSW/IVF workloads measuring p50/p95/p99 latency, recall@k, and throughput at 5B-row scale, adopted as the standard across RDBMS engineering teams.",
  "Resolved 10+ Fortune 500 P1 escalations (ORA-600/ORA-7445 kernel failures) and owned 4 RDBMS features end-to-end, shipped across the 19RU, 23RU, and 23ai releases.",
]

const projects = [
  {
    name: 'Database Stress Testing Framework',
    stack: 'Java 17 · Spring Boot 3.2 · JDBC · PostgreSQL · ExecutorService · Docker',
    link: 'github.com/zebacodes/db-stress-framework',
    desc: 'Configurable Spring Boot REST service for stress-testing any JDBC-compatible database — concurrent thread executor, real-time TPS and p50/p95/p99 latency metrics via WebSocket dashboard, transaction pattern simulation, PDF/JSON report generation. Productized from 4 years of Oracle concurrent execution engineering at 5B row scale on Exadata and RAC.',
  },
  {
    name: 'Vector Search Benchmarking Platform',
    stack: 'Java 17 · Spring Boot 3.2 · pgvector · PostgreSQL · Docker',
    link: 'github.com/zebacodes/vector-search-benchmark',
    desc: 'Spring Boot REST service benchmarking HNSW vs IVF vs Flat vector search on pgvector — measuring recall@k, p50/p95/p99 latency, index build time, and memory across dataset scales. Tunable HNSW and IVF parameters. Built on real Oracle HNSW/IVF production knowledge at 5B rows.',
  },
]

const learningItems = [
  'Distributed Systems',
  'Java Internals & JVM',
  'System Design (LLD/HLD)',
  'Spring Boot',
]

const proofChips = [
  'Oracle RDBMS 23ai / 19c',
  '5B-row stress testing',
  'Vector search benchmarking',
]

const proofStats = [
  { value: '5B', label: 'Rows stress-tested' },
  { value: '500+', label: 'Benchmark workloads built' },
  { value: '10+', label: 'P1 escalations resolved' },
  { value: '4', label: 'RDBMS features shipped' },
]

function SectionHeader({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-10">
      <span className="font-display italic text-[14px] font-bold" style={{ color: 'rgba(200,240,0,0.6)' }}>
        {n}.
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(240,235,224,0.3)' }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(240,235,224,0.06)' }} />
    </div>
  )
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default async function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* ══════════════════════════════════════ HERO ══════════════════════════════════════ */}
      <div className="border-b" style={{ borderColor: 'rgba(240,235,224,0.07)' }}>

        {/* Hero main */}
        <div className="relative overflow-hidden">
          {/* Ghost text — visual surprise */}
          <div
            className="absolute hidden sm:block font-display font-black italic select-none pointer-events-none"
            style={{
              bottom: '-32px',
              left: 'clamp(1.5rem, 6vw, 5rem)',
              fontSize: 'clamp(96px, 15vw, 210px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(240,235,224,0.05)',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              zIndex: 0,
            }}
          >
            engineer
          </div>

          {/* Content grid */}
          <div className="site-shell grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] items-center py-14 sm:py-16 lg:py-20 relative z-10 gap-12 lg:gap-16">

            {/* LEFT — text */}
            <div className="lg:border-r lg:pr-12 min-w-0" style={{ borderColor: 'rgba(240,235,224,0.07)' }}>
              {/* Kicker */}
              <div
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
                style={{ color: 'rgba(240,235,224,0.3)' }}
              >
                <span className="w-8 h-px bg-[#c8f000] flex-shrink-0" />
                Backend engineer · Building in public
              </div>

              {/* Name */}
              <h1
                className="font-display font-black leading-[0.95] tracking-[-3px] mb-2"
                style={{ fontSize: 'clamp(64px, 8vw, 108px)' }}
              >
                <span className="block" style={{ color: '#f5f1e8' }}>Zeba</span>
                <span
                  className="block font-black italic"
                  style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(240,235,224,0.22)' }}
                >
                  Ali
                </span>
              </h1>

              {/* Divider */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 my-7">
                <div className="flex-1 h-px" style={{ background: 'rgba(240,235,224,0.07)' }} />
                <div
                  className="font-mono text-[10px] tracking-[0.14em] uppercase sm:px-4"
                  style={{ color: 'rgba(240,235,224,0.2)' }}
                >
                  Java · Spring Boot · Oracle RDBMS · AI Infrastructure
                </div>
                <div className="flex-1 h-px" style={{ background: 'rgba(240,235,224,0.07)' }} />
              </div>

              <div className="flex flex-wrap gap-2.5 mb-7">
                {proofChips.map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[10px] uppercase tracking-[0.09em] px-3 py-1.5 rounded-full"
                    style={{
                      border: '1px solid rgba(200,240,0,0.18)',
                      background: 'rgba(200,240,0,0.055)',
                      color: 'rgba(226,255,88,0.82)',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p
                className="text-[16px] font-light leading-[1.9] mb-9 max-w-[620px]"
                style={{ color: 'rgba(240,235,224,0.68)' }}
              >
                I spent four years inside Oracle&apos;s Server Technologies Group working on{' '}
                <strong className="font-medium" style={{ color: '#f0ebe0' }}>RDBMS 23ai and 19c</strong>{' '}
                — the database engine itself, not applications built on top of it.
                In April 2026 the Oracle India layoffs ended that chapter.
                I&apos;m building in public: going deeper into{' '}
                <strong className="font-medium" style={{ color: '#f0ebe0' }}>
                  distributed systems, Java internals, and system design
                </strong>{' '}
                — and writing about all of it. Including what it&apos;s like to be a{' '}
                <span style={{ color: '#c8f000' }}>woman doing this work.</span>
              </p>

              {/* CTAs */}
              <div className="flex gap-2.5 flex-wrap items-center">
                <Link
                  href="/projects"
                  className="font-sans text-[13px] font-medium px-5 py-2.5 rounded-md transition-all duration-150"
                  style={{ background: '#f5f1e8', color: '#0a0a0a' }}
                >
                  View projects →
                </Link>
                <a
                  href="/Zeba_Ali_Resume_Final.docx"
                  download
                  className="font-sans text-[13px] font-medium px-4 py-2.5 rounded-md transition-all duration-150"
                  style={{ border: '1px solid rgba(200,240,0,0.3)', color: '#c8f000' }}
                >
                  Resume ↓
                </a>
                <Link
                  href="/writing"
                  className="font-sans text-[13px] font-normal px-4 py-2.5 rounded-md transition-all duration-150 hover:border-[#c8f000]"
                  style={{ border: '1px solid rgba(240,235,224,0.16)', color: 'rgba(240,235,224,0.72)' }}
                >
                  Read my writing
                </Link>
                <a
                  href="mailto:zebaali1514@gmail.com"
                  className="font-sans text-[13px] font-normal px-4 py-2.5 rounded-md transition-all duration-150"
                  style={{ border: '1px solid rgba(240,235,224,0.16)', color: 'rgba(240,235,224,0.62)' }}
                >
                  Get in touch
                </a>
              </div>
            </div>

            {/* RIGHT — photo + floating cards */}
            <div className="flex flex-col items-center lg:items-end lg:pl-2">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]">
                {/* Photo */}
                <div
                  className="relative overflow-hidden rounded-[4px]"
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    border: '1px solid rgba(240,235,224,0.08)',
                    transform: 'rotate(1.5deg)',
                    background: '#141414',
                  }}
                >
                  {/* Lime top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 z-10"
                    style={{ height: '3px', background: '#c8f000' }}
                  />
                  <Image
                    src="/zeba.jpg"
                    alt="Zeba Ali"
                    fill
                    className="object-cover object-top"
                    style={{ filter: 'contrast(1.04) brightness(0.92) saturate(0.85)' }}
                    priority
                  />
                </div>

                {/* Floating card — experience */}
                <div
                  className="absolute rounded-lg px-4 py-3 max-sm:left-2"
                  style={{
                    bottom: '-16px',
                    left: '-34px',
                    background: 'rgba(14,14,14,0.94)',
                    border: '1px solid rgba(240,235,224,0.1)',
                    backdropFilter: 'blur(12px)',
                    transform: 'rotate(-2deg)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                    zIndex: 20,
                  }}
                >
                  <div
                    className="font-mono text-[9px] uppercase tracking-[0.12em] mb-1"
                    style={{ color: 'rgba(240,235,224,0.28)' }}
                  >
                    Oracle RDBMS
                  </div>
                  <div className="text-[15px] font-semibold" style={{ color: '#f0ebe0' }}>4 years</div>
                  <div className="text-[11px] mt-0.5" style={{ color: 'rgba(240,235,224,0.4)' }}>
                    kernel engineering
                  </div>
                </div>

                {/* Floating card — status */}
                <div
                  className="absolute rounded-lg px-4 py-3 max-sm:right-2"
                  style={{
                    top: '-16px',
                    right: '-28px',
                    background: 'rgba(14,14,14,0.94)',
                    border: '1px solid rgba(240,235,224,0.1)',
                    backdropFilter: 'blur(12px)',
                    transform: 'rotate(1.5deg)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                    zIndex: 20,
                  }}
                >
                  <div
                    className="font-mono text-[9px] uppercase tracking-[0.12em] mb-1"
                    style={{ color: 'rgba(240,235,224,0.28)' }}
                  >
                    Status
                  </div>
                  <div className="text-[15px] font-semibold" style={{ color: '#c8f000' }}>Building</div>
                  <div className="text-[11px] mt-0.5" style={{ color: 'rgba(240,235,224,0.4)' }}>
                    in public
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* By the numbers */}
        <div
          className="site-shell border-t py-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
          style={{ borderColor: 'rgba(240,235,224,0.06)' }}
        >
          {proofStats.map((stat) => (
            <div key={stat.label}>
              <div
                className="font-display font-black leading-tight mb-1.5"
                style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', color: '#c8f000' }}
              >
                {stat.value}
              </div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.12em]"
                style={{ color: 'rgba(240,235,224,0.35)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Currently going deeper in */}
        <div
          className="site-shell border-t py-5 flex flex-wrap items-center gap-4 sm:gap-6"
          style={{ borderColor: 'rgba(240,235,224,0.06)' }}
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.16em] flex-shrink-0 flex items-center gap-2"
            style={{ color: 'rgba(240,235,224,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f000] animate-pulse" />
            Currently going deeper in
          </div>
          <div className="flex gap-3 flex-wrap">
            {learningItems.map((item) => (
              <span
                key={item}
                className="text-[12px] font-normal px-3 py-1 rounded-full"
                style={{ border: '1px solid rgba(240,235,224,0.08)', color: 'rgba(240,235,224,0.38)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════ THE WORK ══════════════════════════════════════ */}
      <section
        className="site-shell section-pad border-t"
        style={{ borderColor: 'rgba(240,235,224,0.07)' }}
      >
        <div className="grid gap-5 md:gap-20 md:grid-cols-[auto_1fr]">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.16em] pt-1.5 w-[100px] shrink-0"
            style={{ color: 'rgba(240,235,224,0.22)' }}
          >
            The work
          </div>
          <p
            className="text-[18px] sm:text-[20px] font-light leading-[1.78]"
            style={{ color: 'rgba(240,235,224,0.66)', letterSpacing: '-0.2px' }}
          >
            For nearly four years I worked on the part of Oracle that most engineers never touch —{' '}
            <strong className="font-medium" style={{ color: '#f0ebe0' }}>the database kernel</strong>.
            Architecting Java frameworks that stress-tested Oracle RDBMS at{' '}
            <strong className="font-medium" style={{ color: '#f0ebe0' }}>5 billion rows</strong>{' '}
            across RAC, Exadata, and Exascale. Resolving Fortune 500 production escalations —
            kernel failures that crash banks at 3am. Building the{' '}
            <span style={{ color: '#c8f000' }}>
              first parameterized vector search benchmarking engine in the team
            </span>
            {' '}— adopted as standard across Oracle RDBMS engineering groups.
            That work is invisible by design. I&apos;m making it visible here.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════ 01. STACK ══════════════════════════════════════ */}
      <StackSection />

      {/* ══════════════════════════════════════ 02. EXPERIENCE ══════════════════════════════════════ */}
      <section
        className="site-shell section-pad border-t"
        style={{ borderColor: 'rgba(240,235,224,0.07)' }}
      >
        <SectionHeader n="02" label="Experience" />

        {/* Oracle */}
        <div className="py-8 border-b" style={{ borderColor: 'rgba(240,235,224,0.05)' }}>
          <div className="flex flex-wrap justify-between items-start gap-6 mb-5">
            <div>
              <h3
                className="font-display text-[22px] font-bold tracking-tight mb-1.5"
                style={{ color: '#f5f1e8' }}
              >
                Oracle India Pvt. Ltd.
              </h3>
              <p className="text-[13px] font-normal" style={{ color: 'rgba(240,235,224,0.38)' }}>
                Member of Technical Staff (MTS, IC2) · Server Technologies Group · Oracle RDBMS 23ai &amp; 19c · Noida
              </p>
            </div>
            <span
              className="font-mono text-[11px] text-right leading-relaxed flex-shrink-0"
              style={{ color: 'rgba(240,235,224,0.25)' }}
            >
              Jul 2022 – Apr 2026
            </span>
          </div>

          <ul className="flex flex-col gap-4">
            {oracleBullets.map((point, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="font-mono text-[10px] mt-1.5 flex-shrink-0"
                  style={{ color: '#c8f000', opacity: 0.6 }}
                >
                  —
                </span>
                <p
                  className="text-[14px] font-light leading-[1.78]"
                  style={{ color: 'rgba(240,235,224,0.5)' }}
                >
                  {point}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/journey"
            className="inline-flex items-center gap-2 mt-6 text-[13px] font-normal transition-colors duration-150"
            style={{ color: 'rgba(200,240,0,0.65)' }}
          >
            Read the full story of the Oracle years →
          </Link>
        </div>

        {/* Wabtec */}
        <div className="py-8">
          <div className="flex flex-wrap justify-between items-start gap-6 mb-5">
            <div>
              <h3
                className="font-display text-[22px] font-bold tracking-tight mb-1.5"
                style={{ color: '#f5f1e8' }}
              >
                Wabtec Corporation
              </h3>
              <p className="text-[13px]" style={{ color: 'rgba(240,235,224,0.38)' }}>
                Software Engineer Intern
              </p>
            </div>
            <span
              className="font-mono text-[11px]"
              style={{ color: 'rgba(240,235,224,0.25)' }}
            >
              2021 – 2022
            </span>
          </div>
          <p
            className="text-[14px] font-light leading-[1.78]"
            style={{ color: 'rgba(240,235,224,0.5)' }}
          >
            Built Java backend data pipelines and MS SQL Server integrations for rail logistics workflows.
            Developed MDM automation using Informatica PowerCenter.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════ 03. PROJECTS ══════════════════════════════════════ */}
      <section
        className="site-shell section-pad border-t"
        style={{ borderColor: 'rgba(240,235,224,0.07)' }}
      >
        <SectionHeader n="03" label="Projects" />

        {projects.map((project) => (
          <div
            key={project.name}
            className="py-8 border-b"
            style={{ borderColor: 'rgba(240,235,224,0.05)' }}
          >
            <div className="flex flex-wrap justify-between items-start gap-6 mb-3">
              <h3
                className="font-display text-[20px] font-bold tracking-tight"
                style={{ color: '#f5f1e8' }}
              >
                {project.name}
              </h3>
              <a
                href={`https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] flex-shrink-0 transition-colors duration-150 hover:text-[#c8f000]"
                style={{ color: 'rgba(240,235,224,0.3)' }}
              >
                {project.link} ↗
              </a>
            </div>
            <div
              className="font-mono text-[11px] mb-4"
              style={{ color: 'rgba(200,240,0,0.55)' }}
            >
              {project.stack}
            </div>
            <p
              className="text-[14px] font-light leading-[1.78]"
              style={{ color: 'rgba(240,235,224,0.5)' }}
            >
              {project.desc}
            </p>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════ 04. WRITING ══════════════════════════════════════ */}
      {posts.length > 0 && (
        <section
          className="site-shell section-pad border-t"
          style={{ borderColor: 'rgba(240,235,224,0.07)' }}
        >
          <SectionHeader n="04" label="Writing" />

          <div>
            {posts.map((post) => {
              const cfg = getCategoryConfig(post.category)
              return (
                <Link
                  key={`${post.category}/${post.slug}`}
                  href={`/writing/${post.category}/${post.slug}`}
                  className="group block"
                >
                  <div
                    className="py-5 border-b transition-all duration-150 cursor-pointer"
                    style={{ borderColor: 'rgba(240,235,224,0.05)' }}
                  >
                    <div className="flex items-baseline justify-between gap-6 flex-wrap">
                      <div>
                        <div
                          className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2"
                          style={{ color: 'rgba(200,240,0,0.55)' }}
                        >
                          {cfg.label}
                        </div>
                        <h3
                          className="font-display text-[18px] font-bold leading-snug tracking-tight transition-colors duration-150 group-hover:text-[#f5f1e8]"
                          style={{ color: 'rgba(240,235,224,0.6)' }}
                        >
                          {post.title}
                        </h3>
                      </div>
                      <span
                        className="font-mono text-[11px] flex-shrink-0"
                        style={{ color: 'rgba(240,235,224,0.22)' }}
                      >
                        {fmt(post.date)} · {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <Link
            href="/writing"
            className="inline-flex items-center gap-2 mt-6 text-[13px] font-normal transition-colors duration-150"
            style={{ color: 'rgba(200,240,0,0.65)' }}
          >
            All posts →
          </Link>
        </section>
      )}

      {/* ══════════════════════════════════════ NEWSLETTER ══════════════════════════════════════ */}
      <section
        className="site-shell section-pad border-t"
        style={{ borderColor: 'rgba(240,235,224,0.07)' }}
      >
        <div className="flex flex-wrap justify-between items-center gap-10">
          <div>
            <h3
              className="font-display italic text-[28px] font-bold mb-2"
              style={{ color: '#f5f1e8' }}
            >
              Stay in the loop.
            </h3>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.1em]"
              style={{ color: 'rgba(240,235,224,0.28)' }}
            >
              Backend engineering · Building in public · Women in tech
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
