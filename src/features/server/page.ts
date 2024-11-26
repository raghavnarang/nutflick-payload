import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { z } from 'zod'

export const getPages = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'pages', pagination: false })
    return docs
  },
  ['pages'],
  { tags: ['pages'] },
)

export const getPageBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: z.string().parse(slug) } },
      limit: 1,
    })

    return docs.length > 0 ? docs[0] : null
  },
  ['pages'],
  { tags: ['pages'] },
)
