'use client'

import { useEffect } from 'react'
import { useCartStore } from '../provider'
import type { Product } from '@/payload-types'
import { generateCartItem } from '../../utils'

export default function SyncCartClient({ products }: { products: Product[] }) {
  const { isHydrated, setCartItems, cart } = useCartStore((state) => state)
  useEffect(() => {
    if (isHydrated && cart.items.length > 0) {
      const cartItems = cart.items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId)
          if (product) {
            return generateCartItem(product, item.variantId, item.qty)
          }
          return item
        })
        .filter((item) => !!item)
      setCartItems(cartItems)
    }
  }, [isHydrated])

  return null
}
