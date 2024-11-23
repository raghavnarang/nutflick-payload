import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import styles from './style.module.css'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
  if (docs.length === 0 || !docs[0].content_html) {
    notFound()
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl mb-5">{docs[0].title}</h1>
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: docs[0].content_html }} />
      </div>
    </div>
  )
}
