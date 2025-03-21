import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getHomePageOptions = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'home-page-options', depth: 2 })
  },
  ['home'],
  { tags: ['home'] },
)

export { getHomePageOptions }
