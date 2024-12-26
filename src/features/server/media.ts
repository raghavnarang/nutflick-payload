import 'server-only'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getMedia = unstable_cache(
  async (id: number) => {
    const payload = await getPayload({ config })
    return payload.findByID({ collection: 'media', id, depth: 1 })
  },
  ['media'],
  { tags: ['media'] },
)