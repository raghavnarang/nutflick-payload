import type { Product } from '@/payload-types'
import type { CartItem } from '@/shared/types/cart'
import { getProductVariantTitle } from '@/utils/product'

export const generateCartItem = (
  product: Product,
  variantId: string,
  qty?: number,
): CartItem | null => {
  const variant = product.variants?.find((v) => v.id === variantId)
  if (!variant) {
    return null
  }

  const variantImage = typeof variant.image != 'number' && variant.image && variant.image.url
  const productImage = typeof product.image != 'number' && product.image && product.image.url

  return {
    productId: product.id,
    variantId: variantId,
    title: getProductVariantTitle(product, variant),
    image: variantImage || productImage || undefined,
    qty: qty || 1,
    price: variant.price,
    productSlug: product.slug || '',
    variantSlug: variant.slug || '',
    category:
      typeof product.category?.value !== 'number' ? product.category?.value.title : undefined,
    shippingCovered: variant.includedShippingCost,
  }
}
