'use server'

import 'server-only'
import { z } from 'zod'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { generateCartItem } from '../cart/utils'

interface CartItemForSync {
  productId: number
  variantId: string
  qty: number
}

const CartItemForSyncSchema = z.object({
  productId: z.number(),
  variantId: z.string(),
  qty: z.number(),
})

export const syncCartItems = async (items: CartItemForSync[]) => {
  const parsedItems = z.array(CartItemForSyncSchema).parse(items)
  const payload = await getPayloadHMR({ config })
  const products = await payload.find({
    collection: 'products',
    pagination: false,
    where: { id: { in: parsedItems.map((i) => i.productId) } },
  })

  if (products.docs.length === 0) {
    return []
  }

  return parsedItems
    .map((item) => {
      const product = products.docs.find((p) => p.id === item.productId)
      if (!product) {
        return undefined
      }

      return generateCartItem(product, item.variantId, item.qty)
    })
    .filter((item) => !!item)
}
