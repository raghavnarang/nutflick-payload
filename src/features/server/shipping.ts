'use server'

import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export const getShippingOptions = async () => {
  const payload = await getPayloadHMR({ config })
  const optionsData = await payload.findGlobal({
    slug: 'shipping-options',
  })

  return optionsData.option
}
