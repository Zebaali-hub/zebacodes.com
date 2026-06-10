'use client'

const skills = [
  {
    cat: 'Languages',
    items: ['Java', 'PL/SQL', 'SQL', 'Python', 'Shell Scripting'],
  },
  {
    cat: 'Backend',
    items: ['Spring Boot 3.x', 'REST API Design', 'Microservices', 'Spring Security', 'JWT', 'JPA/Hibernate', 'Maven', 'JUnit 5'],
  },
  {
    cat: 'Databases',
    items: ['Oracle Database', 'Oracle RAC', 'PostgreSQL', 'Redis', 'pgvector', 'NoSQL'],
  },
  {
    cat: 'DB Internals',
    items: ['MVCC', 'B-Tree/Hash Indexing', 'Connection Pooling', 'Query Optimization', 'EXPLAIN Plans', 'Partitioning', 'Concurrency Control', 'TDE', 'Data Pump'],
  },
  {
    cat: 'AI / Vector',
    items: ['HNSW', 'IVF Indexing', 'Vector Databases', 'pgvector', 'RAG Systems', 'Embedding-based Search'],
  },
  {
    cat: 'Engineering',
    items: ['Distributed Systems', 'Concurrent Thread Pools', 'System Design', 'CI/CD Pipelines', 'Docker', 'Linux', 'Git/GitHub', 'Agile/Scrum'],
  },
]

const baseStyle = {
  background:   'rgba(240,235,224,0.04)',
  borderColor:  'rgba(240,235,224,0.08)',
  color:        'rgba(240,235,224,0.62)',
}

const hoverStyle = {
  background:  'rgba(200,240,0,0.07)',
  borderColor: 'rgba(200,240,0,0.3)',
  color:       '#c8f000',
}

export default function StackSection() {
  return (
    <section
      className="px-6 sm:px-12 py-16 border-t max-w-[1200px] mx-auto"
      style={{ borderColor: 'rgba(240,235,224,0.07)' }}
    >
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-10">
        <span
          className="font-display italic text-[14px] font-bold"
          style={{ color: 'rgba(200,240,0,0.6)' }}
        >
          01.
        </span>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: 'rgba(240,235,224,0.3)' }}
        >
          Technical Stack
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(240,235,224,0.06)' }} />
      </div>

      {/* Rows */}
      <div>
        {skills.map(({ cat, items }) => (
          <div
            key={cat}
            className="grid py-4 items-start"
            style={{
              gridTemplateColumns: '160px 1fr',
              borderBottom: '1px solid rgba(240,235,224,0.05)',
            }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.12em] pt-1"
              style={{ color: 'rgba(240,235,224,0.25)' }}
            >
              {cat}
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="text-[14px] font-normal px-3 py-1.5 rounded-[5px] transition-all duration-150 cursor-default border"
                  style={baseStyle}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background  = hoverStyle.background
                    el.style.borderColor = hoverStyle.borderColor
                    el.style.color       = hoverStyle.color
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background  = baseStyle.background
                    el.style.borderColor = baseStyle.borderColor
                    el.style.color       = baseStyle.color
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
