'use client'

import { useEffect } from 'react'

export default function FBPixelPurchase({
  products,
  total,
}: {
  products: { productId: number; variantId: string; qty: number }[]
  total: number
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'fbq' in window && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        content_ids: products.map((item) => `${item.productId}__${item.variantId}`),
        contents: products.map((item) => ({
          id: `${item.productId}__${item.variantId}`,
          quantity: item.qty,
        })),
        currency: 'INR',
        num_items: products.length,
        value: total,
      })
    }
  }, [])

  return null
}
