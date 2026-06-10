import { redirect } from 'next/navigation'

type Props = { params: Promise<{ category: string; slug: string }> }

export default async function BlogPostRedirect({ params }: Props) {
  const { category, slug } = await params
  redirect(`/writing/${category}/${slug}`)
}
