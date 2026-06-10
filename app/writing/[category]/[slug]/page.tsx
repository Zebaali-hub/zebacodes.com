import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug, extractHeadings } from '@/lib/posts'
import { getCategoryConfig } from '@/lib/categories'
import ReadingProgress from '@/components/ReadingProgress'
import CopyCodeBlock from '@/components/CopyCodeBlock'
import { DesktopToC, MobileToC } from '@/components/TableOfContents'
import { NewsletterForm } from '@/components/NewsletterForm'

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const post = getPostBySlug(category, slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  }
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

const mdxComponents = { pre: CopyCodeBlock }

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params
  const post = getPostBySlug(category, slug)
  if (!post) notFound()

  const cfg      = getCategoryConfig(post.category)
  const headings = extractHeadings(post.content)

  const allPosts = getAllPosts()
  const idx      = allPosts.findIndex((p) => p.category === category && p.slug === slug)
  const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null
  const nextPost = idx > 0 ? allPosts[idx - 1] : null

  const liShare  = `https://linkedin.com/sharing/share-offsite/?url=https://zebacodes.com/writing/${category}/${slug}`

  return (
    <>
      <ReadingProgress />

      <div className="px-6 sm:px-12 py-14 max-w-[1200px] mx-auto">

        {/* Back */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] mb-12 transition-colors duration-150"
          style={{ color: 'rgba(232,228,220,0.3)' }}
        >
          ← Writing
        </Link>

        {/* Header */}
        <div className="max-w-[720px] mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-4" style={{ color: '#6495ff', opacity: 0.65 }}>
            {cfg.label}
          </div>
          <h1
            className="font-display text-[32px] sm:text-[38px] font-bold tracking-tight leading-tight mb-5"
            style={{ color: '#f5f1e8' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-mono text-[11px]" style={{ color: 'rgba(232,228,220,0.3)' }}>
              {fmt(post.date)}
            </span>
            <span style={{ color: 'rgba(232,228,220,0.15)' }}>·</span>
            <span className="font-mono text-[11px]" style={{ color: 'rgba(232,228,220,0.3)' }}>
              {post.readTime}
            </span>
          </div>
        </div>

        <div className="border-b mb-10" style={{ borderColor: 'rgba(232,228,220,0.07)' }} />

        {/* Mobile ToC */}
        <MobileToC headings={headings} />

        {/* Two-column layout */}
        <div className="flex gap-16 items-start">
          {/* Article */}
          <article className="flex-1 min-w-0 post-prose">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: true }],
                  ] as never[],
                },
              }}
            />
          </article>

          {/* Desktop ToC */}
          <aside className="hidden lg:block w-48 shrink-0 sticky top-24 self-start">
            <DesktopToC headings={headings} />
          </aside>
        </div>

        {/* Post footer */}
        <div className="mt-16 pt-10 border-t max-w-[720px]" style={{ borderColor: 'rgba(232,228,220,0.07)' }}>
          {/* Share */}
          <div className="mb-10">
            <a
              href={liShare}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[13px] font-normal px-5 py-2.5 rounded-md transition-all duration-150"
              style={{ border: '1px solid rgba(232,228,220,0.1)', color: 'rgba(232,228,220,0.5)' }}
            >
              Share on LinkedIn ↗
            </a>
          </div>

          {/* Prev / Next */}
          {(prevPost || nextPost) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {prevPost && (
                <Link
                  href={`/writing/${prevPost.category}/${prevPost.slug}`}
                  className="py-4 border-b transition-colors duration-150 group"
                  style={{ borderColor: 'rgba(232,228,220,0.07)' }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(232,228,220,0.25)' }}>← Previous</p>
                  <p className="font-display text-[15px] font-bold leading-snug" style={{ color: 'rgba(232,228,220,0.55)' }}>
                    {prevPost.title}
                  </p>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={`/writing/${nextPost.category}/${nextPost.slug}`}
                  className="py-4 border-b transition-colors duration-150 group sm:text-right"
                  style={{ borderColor: 'rgba(232,228,220,0.07)' }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'rgba(232,228,220,0.25)' }}>Next →</p>
                  <p className="font-display text-[15px] font-bold leading-snug" style={{ color: 'rgba(232,228,220,0.55)' }}>
                    {nextPost.title}
                  </p>
                </Link>
              )}
            </div>
          )}

          {/* Newsletter */}
          <div className="pt-4">
            <p className="font-display italic text-[20px] font-bold mb-2" style={{ color: '#f5f1e8' }}>
              Enjoying this? Get posts in your inbox.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] mb-6" style={{ color: 'rgba(232,228,220,0.28)' }}>
              Backend engineering · Building in public · Women in tech
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </>
  )
}
