'use server'

import 'server-only'
import { z } from 'zod'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { generateCartItem } from '../cart/utils'

interface CartItem {
  productId: number
  variantId: string
  qty: number
}

interface OrderProduct {
  variantId: string
  productRef: number
  qty: number
  title: string
  price: number
  weight: number
  includedShippingCost?: number
}

const CartItemSchema = z.object({
  productId: z.number(),
  variantId: z.string(),
  qty: z.number(),
})

export const syncCartItems = async (items: CartItem[]) => {
  const parsedItems = z.array(CartItemSchema).parse(items)
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

export const getOrderProductsFromCartItems = async (items: CartItem[]) => {
  const parsedItems = z.array(CartItemSchema).parse(items)
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
      if (!item.qty) {
        return undefined
      }

      const product = products.docs.find((p) => p.id === item.productId)
      if (!product) {
        return undefined
      }

      const variant = product.variants?.find((v) => v.id === item.variantId)
      if (!variant) {
        return undefined
      }

      return {
        variantId: item.variantId,
        productRef: item.productId,
        qty: item.qty,
        title: `${product.title} - ${variant.title}`,
        price: variant.price,
        weight: variant.weight,
        includedShippingCost: variant.includedShippingCost,
      }
    })
    .filter((item) => !!item)
}
