import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Tools, references, and materials I actually use. No sponsored content. No affiliate links.',
}

type Resource = { name: string; href: string; note: string; tag: 'Free' | 'Paid' | 'Free/Paid' }

const sections: { heading: string; items: Resource[] }[] = [
  {
    heading: 'Learning',
    items: [
      { name: 'Designing Data-Intensive Applications (DDIA)', href: 'https://dataintensive.net',         note: 'Best book on distributed systems and database internals. Every serious backend engineer should own this.', tag: 'Paid'      },
      { name: 'Java Concurrency in Practice',                  href: 'https://jcip.net',                  note: 'Still the definitive reference for Java concurrency. Dense but worth it.',                                 tag: 'Paid'      },
      { name: 'NeetCode.io',                                   href: 'https://neetcode.io',               note: 'DSA practice. Clean explanations, well-structured by pattern.',                                           tag: 'Free/Paid' },
      { name: 'ByteByteGo',                                    href: 'https://bytebytego.com',            note: 'HLD system design. Good visual explanations, good for building intuition.',                                tag: 'Free/Paid' },
      { name: 'PostgreSQL Documentation',                      href: 'https://postgresql.org/docs',       note: 'Not glamorous, but the actual source of truth.',                                                          tag: 'Free'      },
    ],
  },
  {
    heading: 'Tools',
    items: [
      { name: 'IntelliJ IDEA',         href: 'https://jetbrains.com/idea',           note: 'Primary Java IDE. No substitute.',                         tag: 'Free/Paid' },
      { name: 'VS Code',               href: 'https://code.visualstudio.com',        note: 'Everything else.',                                         tag: 'Free'      },
      { name: 'Docker',                href: 'https://docker.com',                   note: 'Local environment parity on every project.',               tag: 'Free'      },
      { name: 'pgvector + PostgreSQL', href: 'https://github.com/pgvector/pgvector', note: 'Vector search development and benchmarking.',              tag: 'Free'      },
      { name: 'Obsidian',              href: 'https://obsidian.md',                  note: 'Personal knowledge base. All learning notes live here.',   tag: 'Free/Paid' },
    ],
  },
  {
    heading: 'Reference Docs',
    items: [
      { name: 'Oracle RDBMS Documentation', href: 'https://docs.oracle.com/en/database',     note: 'The canonical source for Oracle internals.', tag: 'Free' },
      { name: 'PostgreSQL Official Docs',    href: 'https://postgresql.org/docs',             note: 'Rigorous and complete.',                     tag: 'Free' },
      { name: 'Spring Boot Reference',       href: 'https://docs.spring.io',                  note: 'Start here for any Spring Boot question.',   tag: 'Free' },
      { name: 'Java SE API Documentation',   href: 'https://docs.oracle.com/en/java/javase',  note: 'javadoc for the standard library.',          tag: 'Free' },
    ],
  },
  {
    heading: 'Women in Tech',
    items: [
      { name: 'Tech Ladies',    href: 'https://techladies.co',    note: 'Job board and community. Actually useful.',           tag: 'Free' },
      { name: 'Women Who Code', href: 'https://womenwhocode.com', note: 'Events and community.',                               tag: 'Free' },
      { name: 'Lean In',        href: 'https://leanin.org',       note: 'For when the soft stuff is actually the hard stuff.', tag: 'Free' },
    ],
  },
]

const tagColors: Record<Resource['tag'], { bg: string; color: string }> = {
  'Free':      { bg: 'rgba(100,149,255,0.08)', color: 'rgba(100,149,255,0.65)' },
  'Paid':      { bg: 'rgba(232,228,220,0.05)', color: 'rgba(232,228,220,0.3)'  },
  'Free/Paid': { bg: 'rgba(232,228,220,0.04)', color: 'rgba(232,228,220,0.25)' },
}

export default function ResourcesPage() {
  return (
    <div className="px-6 sm:px-12 py-20 max-w-[760px] mx-auto">
      <div className="mb-16">
        <h1
          className="font-display text-[42px] sm:text-[56px] font-black tracking-tight leading-none mb-4"
          style={{ color: '#f5f1e8' }}
        >
          Resources
        </h1>
        <p
          className="font-mono text-[11px] uppercase tracking-[0.12em]"
          style={{ color: 'rgba(232,228,220,0.28)' }}
        >
          Things I actually use. No sponsored content. No affiliate links.
        </p>
      </div>

      <div className="space-y-14">
        {sections.map((section) => (
          <div key={section.heading}>
            <div
              className="border-b pb-2 mb-7"
              style={{ borderColor: 'rgba(232,228,220,0.07)' }}
            >
              <h2
                className="font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: 'rgba(232,228,220,0.28)' }}
              >
                {section.heading}
              </h2>
            </div>

            <div className="space-y-6">
              {section.items.map((item) => {
                const tc = tagColors[item.tag]
                return (
                  <div key={item.name} className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-medium transition-colors duration-150"
                        style={{ color: 'rgba(232,228,220,0.75)' }}
                      >
                        {item.name}
                      </a>
                      <p
                        className="text-[13px] font-light mt-0.5 leading-relaxed"
                        style={{ color: 'rgba(232,228,220,0.35)' }}
                      >
                        {item.note}
                      </p>
                    </div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded shrink-0"
                      style={{ background: tc.bg, color: tc.color }}
                    >
                      {item.tag}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
