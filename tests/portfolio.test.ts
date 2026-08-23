import { describe, expect, it } from 'vitest'
import { projects, technologies } from '@/data/portfolio'
import { extractHeadings, getAllPosts } from '@/lib/posts'

describe('portfolio evidence', () => {
  it('keeps every featured project identifiable and linked to the canonical account', () => {
    expect(projects).toHaveLength(6)
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length)
    for (const project of projects) {
      expect(project.href).toMatch(/^https:\/\/github\.com\/Zebaali-hub\//)
      expect(project.stack.length).toBeGreaterThan(2)
      expect(project.decisions.length).toBeGreaterThan(1)
    }
  })

  it('does not duplicate technologies inside a group', () => {
    for (const group of technologies) expect(new Set(group.items).size).toBe(group.items.length)
  })
})

describe('writing content', () => {
  it('loads posts newest first with required metadata', () => {
    const posts = getAllPosts()
    expect(posts.length).toBeGreaterThan(0)
    for (const post of posts) {
      expect(post.title).toBeTruthy()
      expect(post.excerpt).toBeTruthy()
      expect(Number.isNaN(new Date(post.date).getTime())).toBe(false)
    }
    expect(posts.map((post) => post.date)).toEqual([...posts.map((post) => post.date)].sort().reverse())
  })

  it('extracts stable h2 and h3 anchors', () => {
    expect(extractHeadings('## System Design\n### Retry & Backoff')).toEqual([
      { level: 2, text: 'System Design', id: 'system-design' },
      { level: 3, text: 'Retry & Backoff', id: 'retry-backoff' },
    ])
  })
})
