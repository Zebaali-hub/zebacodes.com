import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

export type PostMeta = {
  slug: string
  category: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readTime: string
}

export type Post = PostMeta & { content: string }

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []

  const posts: PostMeta[] = []

  const categories = fs
    .readdirSync(postsDir)
    .filter((f) => fs.statSync(path.join(postsDir, f)).isDirectory())

  for (const category of categories) {
    const categoryDir = path.join(postsDir, category)
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.mdx'))

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(categoryDir, file), 'utf8')
      const { data, content } = matter(raw)

      posts.push({
        slug,
        category,
        title:    data.title    ?? '',
        date:     data.date     ?? '',
        tags:     data.tags     ?? [],
        excerpt:  data.excerpt  ?? '',
        readTime: data.readTime ?? estimateReadTime(content),
      })
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(category: string, slug: string): Post | null {
  const filePath = path.join(postsDir, category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    category,
    title:    data.title    ?? '',
    date:     data.date     ?? '',
    tags:     data.tags     ?? [],
    excerpt:  data.excerpt  ?? '',
    readTime: data.readTime ?? estimateReadTime(content),
    content,
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category)
}

export function extractHeadings(content: string) {
  const headings: { level: number; text: string; id: string }[] = []
  for (const line of content.split('\n')) {
    const m2 = line.match(/^## (.+)$/)
    const m3 = line.match(/^### (.+)$/)
    const raw = m2?.[1] ?? m3?.[1]
    if (!raw) continue
    const text = raw.replace(/\*\*/g, '').replace(/`/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    headings.push({ level: m2 ? 2 : 3, text, id })
  }
  return headings
}
