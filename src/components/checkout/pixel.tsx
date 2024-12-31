'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import { useCartSubtotal } from '@/features/checkout/utils'
import TriggerMetaPixel from '@/features/meta/pixel'

export default function PixelInitiateCheckout() {
  const { items } = useCartStore((state) => state.cart)
  const subtotal = useCartSubtotal()

  const itemsInfo = items.reduce<{
    content_ids: string[]
    contents: { id: string; quantity: number }[]
  }>(
    (carry, p) => {
      const id = `${p.productId}__${p.variantId}`

      return {
        content_ids: [...carry.content_ids, id],
        contents: [...carry.contents, { id, quantity: p.qty }],
      }
    },
    { content_ids: [], contents: [] },
  )

  return (
    <TriggerMetaPixel
      event="InitiateCheckout"
      data={{
        ...itemsInfo,
        currency: 'INR',
        num_items: items.length,
        value: subtotal,
      }}
    />
  )
}
