import { getPageBySlug } from '@/features/server/page'

export interface PageProps {
  params: Promise<{ slug: string }>
}

export async function getPageData({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page?.content_html) {
    return undefined
  }

  return page
}
