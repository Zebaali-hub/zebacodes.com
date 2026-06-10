import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Journey',
  description: 'After nearly four years inside Oracle RDBMS engineering, I was laid off in April 2026. This is what I\'m doing with that.',
}

const timeline = [
  {
    period: 'NOW',
    isCurrent: true,
    content: 'Building in public. Writing. OSS projects. Distributed systems at implementation depth. Becoming a voice for women in tech.',
  },
  {
    period: 'APR 2026',
    content: 'Oracle India layoffs. Nearly 4 years as MTS IC2, Server Technologies Group. Nominated for SMTS IC3 by manager. Ended anyway.',
  },
  {
    period: '2022–2026',
    content: 'Oracle India · MTS IC2 · RDBMS 23ai & 19c. 5B row concurrent workloads. Vector search benchmarking framework adopted cross-team. Fortune 500 production escalations. 150 bugs filed, 13 shipped to production releases. 4 RDBMS features owned end-to-end.',
  },
  {
    period: '2021–2022',
    content: 'Wabtec Corporation · Software Engineer Intern. Java backend pipelines. MS SQL Server integrations. MDM automation with Informatica PowerCenter.',
  },
  {
    period: 'MAY 2022',
    content: 'B.Tech Computer Science · IGDTUW, Delhi NCR',
  },
]

const learning = [
  { title: 'Distributed Systems',  desc: 'Consensus protocols, replication, CAP theorem at implementation level' },
  { title: 'Java Internals',        desc: 'JVM, GC mechanics, concurrency primitives'                             },
  { title: 'LLD',                   desc: 'Design patterns, SOLID, real system-level thinking'                    },
  { title: 'HLD',                   desc: 'System design trade-offs I can defend end-to-end'                      },
  { title: 'Spring Boot',           desc: 'Building real backend services, not just knowing annotations'          },
]

export default function JourneyPage() {
  return (
    <div className="px-6 sm:px-12 py-20 max-w-[760px] mx-auto">

      {/* Header */}
      <div className="mb-16">
        <h1
          className="font-display text-[42px] sm:text-[56px] font-black tracking-tight leading-none mb-5"
          style={{ color: '#f5f1e8' }}
        >
          The Journey
        </h1>
        <p
          className="text-[15px] font-light leading-[1.8]"
          style={{ color: 'rgba(232,228,220,0.52)' }}
        >
          After nearly four years inside Oracle RDBMS engineering, I was laid off in April 2026.
          This is what I&apos;m doing with that.
        </p>
      </div>

      {/* Timeline */}
      <section className="mb-16">
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-8 pb-10 last:pb-0">
              {/* Period label */}
              <div className="w-24 shrink-0 pt-0.5">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: item.isCurrent ? '#6495ff' : 'rgba(232,228,220,0.25)' }}
                >
                  {item.period}
                </span>
              </div>

              {/* Content */}
              <div
                className="flex-1 border-l pl-8 pb-0"
                style={{ borderColor: 'rgba(232,228,220,0.07)' }}
              >
                {item.isCurrent ? (
                  <div className="flex items-start gap-4">
                    <p
                      className="text-[14px] font-light leading-[1.8] flex-1"
                      style={{ color: 'rgba(232,228,220,0.52)' }}
                    >
                      {item.content}
                    </p>
                    <div
                      className="shrink-0 w-10 h-10 rounded-full overflow-hidden"
                      style={{ border: '1px solid rgba(232,228,220,0.1)' }}
                    >
                      <Image
                        src="/zeba.jpg"
                        alt="Zeba Ali"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-[14px] font-light leading-[1.8]"
                    style={{ color: 'rgba(232,228,220,0.45)' }}
                  >
                    {item.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section
        className="py-14 my-16 text-center border-y"
        style={{ borderColor: 'rgba(232,228,220,0.07)' }}
      >
        <p
          className="font-display text-[22px] font-bold italic leading-relaxed"
          style={{ color: 'rgba(232,228,220,0.38)' }}
        >
          &ldquo;I never watched a tutorial.
          <br />I learned by doing, by failing, and by building.&rdquo;
        </p>
      </section>

      {/* Currently Learning */}
      <section className="mb-16">
        <h2
          className="font-display text-[22px] font-bold tracking-tight mb-8"
          style={{ color: '#f5f1e8' }}
        >
          Currently Learning
        </h2>
        <ul className="space-y-4">
          {learning.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0"
                style={{
                  background: '#6495ff',
                  opacity: 0.7,
                  animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                }}
              />
              <div>
                <span className="text-[14px] font-medium" style={{ color: '#f5f1e8' }}>
                  {item.title}
                </span>
                <span className="text-[14px] font-light" style={{ color: 'rgba(232,228,220,0.38)' }}>
                  {' '}— {item.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Open To */}
      <section
        className="border rounded-[6px] p-8"
        style={{ borderColor: 'rgba(232,228,220,0.08)', background: 'rgba(232,228,220,0.02)' }}
      >
        <h2
          className="font-display text-[20px] font-bold tracking-tight mb-3"
          style={{ color: '#f5f1e8' }}
        >
          Open To
        </h2>
        <p
          className="text-[14px] font-light leading-[1.8] mb-6"
          style={{ color: 'rgba(232,228,220,0.52)' }}
        >
          I&apos;m currently open to backend engineering roles — Java, Spring Boot, distributed
          systems, database engineering. If the work is technically deep and the team cares about
          craft, I want to hear about it.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:zebaali1415@gmail.com"
            className="font-sans text-[13px] font-medium px-5 py-2.5 rounded-md transition-all duration-150"
            style={{ background: '#f5f1e8', color: '#0c0c0c' }}
          >
            Email me →
          </a>
          <a
            href="https://linkedin.com/in/zeba-ali"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[13px] font-normal px-5 py-2.5 rounded-md transition-all duration-150"
            style={{ border: '1px solid rgba(232,228,220,0.1)', color: 'rgba(232,228,220,0.5)' }}
          >
            LinkedIn ↗
          </a>
        </div>
      </section>
    </div>
  )
}
