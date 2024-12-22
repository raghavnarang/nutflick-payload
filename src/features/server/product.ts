import 'server-only'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

interface CartItem {
  productId: number
  variantId: string
  qty: number
}

const CartItemSchema = z.object({
  productId: z.number(),
  variantId: z.string(),
  qty: z.number(),
})

export const getOrderProductsFromCartItems = async (items: CartItem[]) => {
  const parsedItems = z.array(CartItemSchema).parse(items)
  const products = await getProductsByIds(parsedItems.map((i) => i.productId))

  if (products.length === 0) {
    return []
  }

  return parsedItems
    .map((item) => {
      if (!item.qty) {
        return undefined
      }

      const product = products.find((p) => p.id === item.productId)
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

export const getProducts = unstable_cache(
  async (slugOnly?: boolean) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'products',
      select: slugOnly
        ? { slug: true }
        : { bigImage: false, description: false, description_html: false },
      pagination: false,
      depth: 1,
      sort: 'createdAt', 
    })
    return docs
  },
  ['products'],
  { tags: ['products'] },
)

const getProductsByIds = async (ids: number[]) => {
  if (ids.length === 0) {
    return []
  }
  const products = await getProducts()
  return ids.map((id) => products.find((p) => id === p.id)).filter((p) => !!p)
}

export const getProduct = unstable_cache(
  async (id: number) => {
    const payload = await getPayload({ config })
    return payload.findByID({ collection: 'products', id, depth: 1 })
  },
  ['products'],
  { tags: ['products'] },
)

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'products',
      where: { slug: { equals: z.string().parse(slug) } },
      depth: 1,
      limit: 1,
    })

    return docs.length > 0 ? docs[0] : null
  },
  ['products'],
  { tags: ['products'] },
)

export const getRecommendedProducts = unstable_cache(
  async (categoryId: number, productId: number) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'products',
      limit: 8,
      where: { 'category.value': { equals: categoryId }, id: { not_equals: productId } },
    })
    return docs
  },
  ['products'],
  { tags: ['products'] },
)
