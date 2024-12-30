import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

export const getShippingOptions = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const optionsData = await payload.findGlobal({
      slug: 'shipping-options',
    })

    return optionsData
  },
  ['shipping-options'],
  { tags: ['shipping-options'] },
)
