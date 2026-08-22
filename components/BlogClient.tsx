'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import { getCategoryConfig } from '@/lib/categories'

const FILTERS = [
  { key: 'all',           label: 'All'           },
  { key: 'dsa',           label: 'DSA'           },
  { key: 'java',          label: 'Java'          },
  { key: 'db',            label: 'DB'            },
  { key: 'spring-boot',   label: 'Spring Boot'   },
  { key: 'lld',           label: 'LLD'           },
  { key: 'hld',           label: 'HLD'           },
  { key: 'career',        label: 'Career'        },
  { key: 'women-in-tech', label: 'Women in Tech' },
]

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function BlogClient({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = posts.filter((post) => {
    const categoryMatch = active === 'all' || post.category === active
    const search = query.trim().toLowerCase()
    const textMatch = !search || `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase().includes(search)
    return categoryMatch && textMatch
  })

  const featured = filtered[0]
  const remaining = filtered.slice(1)

  return (
    <div className="journal-content">
      {featured && <Link href={`/writing/${featured.category}/${featured.slug}`} className="featured-story"><div><span>Featured writing</span><p>{getCategoryConfig(featured.category).label} · {featured.readTime}</p></div><h2>{featured.title}</h2><strong>{featured.excerpt}</strong><em>{fmt(featured.date)} →</em></Link>}
      <section className="domain-explorer"><header><span>Explore by domain</span><p>Follow the subject, not the feed.</p></header><div>{FILTERS.slice(1).map((f, index) => <button key={f.key} className={active === f.key ? 'active' : ''} onClick={() => setActive(active === f.key ? 'all' : f.key)}><span>0{index + 1}</span>{f.label}</button>)}</div></section>
      <div className="journal-tools">
      <label className="writing-search">
        <span>Search writing</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Java, MVCC, systems..." />
      </label>
      <div className="journal-filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={active === f.key ? 'active' : ''}
          >
            {f.label}
          </button>
        ))}
      </div>
      </div>

      <section className="latest-writing"><header><span>Latest writing</span><strong>{filtered.length} published</strong></header>
      {filtered.length === 0 ? (
        <p
          className="font-mono text-[12px] py-16 text-center"
          style={{ color: 'rgba(240,235,224,0.25)' }}
        >
          No posts in this category yet.
        </p>
      ) : (
        remaining.map((post, index) => {
          const cfg = getCategoryConfig(post.category)
          return (
            <Link
              key={`${post.category}/${post.slug}`}
              href={`/writing/${post.category}/${post.slug}`}
              className="journal-row"
            >
              <span>0{index + 2}</span><div><small>{cfg.label}</small><h3>{post.title}</h3><p>{post.excerpt}</p></div><em>{fmt(post.date)}<br />{post.readTime}</em>
            </Link>
          )
        })
      )}</section>
    </div>
  )
}
