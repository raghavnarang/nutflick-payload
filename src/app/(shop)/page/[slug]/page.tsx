import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import styles from './style.module.css'
import type { Metadata } from 'next'

export interface PageProps {
  params: Promise<{ slug: string }>
}

export async function getPageData({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
  if (docs.length === 0 || !docs[0].content_html) {
    return undefined
  }

  return docs[0]
}

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
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: pageData.content_html || '' }}
        />
      </div>
    </div>
  )
}
