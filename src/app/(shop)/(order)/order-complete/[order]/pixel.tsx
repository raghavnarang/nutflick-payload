import TriggerMetaPixel from '@/features/meta/pixel'
import type { Order } from '@/payload-types'

export default function PixelPurchase({ order }: { order: Order }) {
  const subtotal = order.products.reduce((total, p) => total + p.qty * p.price, 0)
  const total = subtotal + (order.rate || 0) - (order.discount || 0)

  const orderItemsInfo = order.products.reduce<{
    content_ids: string[]
    contents: { id: string; quantity: number }[]
  }>(
    (carry, p) => {
      const productId = (typeof p.productRef === 'number' ? p.productRef : p.productRef?.id) || 0
      const id = `${productId}__${p.variantId}`

      return {
        content_ids: [...carry.content_ids, id],
        contents: [...carry.contents, { id, quantity: p.qty }],
      }
    },
    { content_ids: [], contents: [] },
  )

  return (
    <TriggerMetaPixel
      event="Purchase"
      data={{
        ...orderItemsInfo,
        currency: 'INR',
        num_items: order.products.length,
        value: total,
      }}
    />
  )
}
