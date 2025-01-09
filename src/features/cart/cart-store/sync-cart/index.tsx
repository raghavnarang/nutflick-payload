import { getProducts } from '@/features/server/product'
import SyncCartClient from './client'
import { Product } from '@/payload-types'

export default async function SyncCart() {
  const products = await getProducts()
  const finalProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    slug: product.slug,
    image: {
      url: (typeof product.image != 'number' && product.image && product.image.url) || undefined,
    },
    category: {
      value: {
        title:
          typeof product.category?.value !== 'number' ? product.category?.value.title : undefined,
      },
    },
    variants: product.variants?.map((variant) => ({
      id: variant.id,
      title: variant.title,
      slug: variant.slug,
      price: variant.price,
      includedShippingCost: variant.includedShippingCost,
      weight: variant.weight,
      image: {
        url: (typeof variant.image != 'number' && variant.image && variant.image.url) || undefined,
      },
    })),
  }))
  return <SyncCartClient products={finalProducts as unknown as Product[]} />
}
