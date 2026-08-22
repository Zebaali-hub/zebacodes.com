import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogClient from '@/components/BlogClient'
import { PageEnvironment } from '@/components/ui/PageEnvironment'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Real notes from real learning. Backend engineering, distributed systems, and what it\'s like to build in public.',
}

export default function WritingPage() {
  const posts = getAllPosts()

  return <div className="experience-page journal-experience"><PageEnvironment tone="journal" /><header className="experience-hero journal-hero"><p><span>W</span> Engineering journal</p><h1>Complex engineering.<br /><em>Explained simply.</em></h1><strong>Real notes from real learning: backend systems, database internals, and the work behind building in public.</strong></header><BlogClient posts={posts} /></div>
}
