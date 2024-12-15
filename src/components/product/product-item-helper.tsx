'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import { Product } from '@/payload-types'

export default function ProductItemHelper({ product }: { product: Product }) {
  const cart = useCartStore((state) => state.cart)

  if (!product.variants || product.variants.length === 0) {
    return null
  }

  const areProductVariantsInCart = cart.items.find(
    (ci) => ci.productId === product.id && product.variants?.find((v) => v.id === ci.variantId),
  )

  return !areProductVariantsInCart ? (
    <p className="text-xs text-gray-600 mt-2">{product.variants?.length} options available</p>
  ) : (
    <p className="text-xs text-gray-600 mt-2 h-4 flex items-center gap-1">
      Tap <span className='text-primary font-bold text-lg'>+</span> for more options
    </p>
  )
}
