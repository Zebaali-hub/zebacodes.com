import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogClient from '@/components/BlogClient'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Real notes from real learning. Backend engineering, distributed systems, and what it\'s like to build in public.',
}

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <div className="px-6 sm:px-12 py-20 max-w-[900px] mx-auto">
      <div className="mb-14">
        <h1
          className="font-display text-[42px] sm:text-[56px] font-black tracking-tight leading-none mb-5"
          style={{ color: '#f5f1e8' }}
        >
          Writing
        </h1>
        <p
          className="font-mono text-[11px] uppercase tracking-[0.12em] leading-relaxed max-w-lg"
          style={{ color: 'rgba(232,228,220,0.3)' }}
        >
          Real notes from real learning. Backend engineering, distributed systems,
          and what it&apos;s like to build in public.
        </p>
      </div>

      <BlogClient posts={posts} />
    </div>
  )
}
