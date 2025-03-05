import { Product } from '@/payload-types'

export function getProductVariantTitle(
  product: Product,
  variant: NonNullable<Product['variants']>[number],
) {
  return `${product.title} - ${variant.title}`
}

export function generateProportionalDiscount(
  productTotal: number,
  orderSubtotal: number,
  orderDiscount: number,
) {
  return (productTotal / orderSubtotal) * orderDiscount
}
