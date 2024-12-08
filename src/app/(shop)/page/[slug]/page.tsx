import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageData, type PageProps } from './helper'
import { getPages } from '@/features/server/page'
import LexicalView from '@/components/lexical-view'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getPageData({ params })
  if (!data) {
    return {}
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
  const fallbackTitle = `${data.title} | Nutflick`
  return {
    title: data.meta?.title || fallbackTitle,
    description: data.meta?.description,
    openGraph: {
      url: `${baseUrl}/page/${data.slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/page/${data.slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const pageData = await getPageData({ params })
  if (!pageData) {
    notFound()
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl mb-5">{pageData.title}</h1>
        <LexicalView htmlString={pageData.content_html || ''} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const pages = (await getPages()).filter((p) => !!p.content_html)
    return pages.map((p) => ({
      slug: p.slug!,
    }))
  } catch (e) {
    console.log('Unable to connect to DB / generate pages, skipping SSG')
    return []
  }
}
