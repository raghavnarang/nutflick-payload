'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import { useCartSubtotal } from '@/features/checkout/utils'
import { useEffect } from 'react'

export default function FBPixelInitateCheckout() {
  const { items } = useCartStore((state) => state.cart)
  const subtotal = useCartSubtotal()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'fbq' in window && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: items.map((item) => `${item.productId}__${item.variantId}`),
        contents: items.map((item) => ({
          id: `${item.productId}__${item.variantId}`,
          quantity: item.qty,
        })),
        currency: 'INR',
        num_items: items.length,
        value: subtotal,
      })
    }
  }, [])

  return null
}
