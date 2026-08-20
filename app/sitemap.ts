import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { roadmaps } from '@/data/roadmaps'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://zebacodes.com/writing/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  const roadmapUrls: MetadataRoute.Sitemap = roadmaps.map((roadmap) => ({ url: `https://zebacodes.com/roadmaps/${roadmap.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 }))

  return [
    { url: 'https://zebacodes.com',            lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: 'https://zebacodes.com/writing',    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: 'https://zebacodes.com/projects',   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://zebacodes.com/contact',    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://zebacodes.com/roadmaps',   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...roadmapUrls,
    { url: 'https://zebacodes.com/journey',    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://zebacodes.com/resources',  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...postUrls,
  ]
}
