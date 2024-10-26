import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

export const getShippingOptions = unstable_cache(
  async () => {
    const payload = await getPayloadHMR({ config })
    const optionsData = await payload.findGlobal({
      slug: 'shipping-options',
    })

    return optionsData.option
  },
  ['shipping-options'],
  { tags: ['shipping-options'] },
)
