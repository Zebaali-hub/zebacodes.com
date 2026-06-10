import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://zebacodes.com/writing/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: 'https://zebacodes.com',            lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: 'https://zebacodes.com/writing',    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: 'https://zebacodes.com/journey',    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://zebacodes.com/resources',  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...postUrls,
  ]
}
