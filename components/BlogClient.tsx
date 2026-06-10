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

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active)

  return (
    <div>
      {/* Filters */}
      <div
        className="flex gap-6 flex-wrap pb-5 mb-0 border-b"
        style={{ borderColor: 'rgba(240,235,224,0.07)' }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className="text-[13px] font-normal pb-1 transition-colors duration-150 border-b-2"
            style={{
              color:       active === f.key ? '#f0ebe0' : 'rgba(240,235,224,0.3)',
              borderColor: active === f.key ? '#c8f000' : 'transparent',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filtered.length === 0 ? (
        <p
          className="font-mono text-[12px] py-16 text-center"
          style={{ color: 'rgba(240,235,224,0.25)' }}
        >
          No posts in this category yet.
        </p>
      ) : (
        filtered.map((post) => {
          const cfg = getCategoryConfig(post.category)
          return (
            <Link
              key={`${post.category}/${post.slug}`}
              href={`/writing/${post.category}/${post.slug}`}
              className="group block py-5 -mx-4 px-4 transition-colors duration-150 border-b"
              style={{ borderColor: 'rgba(240,235,224,0.05)' }}
            >
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="flex-1 min-w-0">
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
                  <p
                    className="text-[13px] font-light mt-1.5 line-clamp-1"
                    style={{ color: 'rgba(240,235,224,0.3)' }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    className="font-mono text-[11px] mt-2 block"
                    style={{ color: 'rgba(240,235,224,0.22)' }}
                  >
                    {post.readTime}
                  </span>
                </div>
                <span
                  className="font-mono text-[11px] shrink-0 whitespace-nowrap mt-1"
                  style={{ color: 'rgba(240,235,224,0.22)' }}
                >
                  {fmt(post.date)}
                </span>
              </div>
            </Link>
          )
        })
      )}
    </div>
  )
}
