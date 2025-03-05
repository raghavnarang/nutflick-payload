import 'server-only'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

const getGSTRates = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'gst', depth: 0 })
  },
  ['gst-rates'],
  { tags: ['gst-rates'] },
)

const getCategoryGSTRate = unstable_cache(
  async (categoryId?: number) => {
    const rates = await getGSTRates()

    return (
      (categoryId &&
        rates.categoryGSTSets?.find((rate) => rate.category.includes(categoryId))?.rate) ||
      rates.restGSTSet.rate
    )
  },
  ['gst-category-rate'],
  { tags: ['gst-category-rate'] },
)

const getGSTState = async () => (await getGSTRates()).state

export { getGSTRates, getCategoryGSTRate, getGSTState }
