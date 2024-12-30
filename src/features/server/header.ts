import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getHeaderSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'header-settings', depth: 2 })
  },
  ['header'],
  { tags: ['header'] },
)

export { getHeaderSettings }
