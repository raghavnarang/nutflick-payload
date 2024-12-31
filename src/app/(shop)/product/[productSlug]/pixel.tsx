import TriggerMetaPixel from '@/features/meta/pixel'
import type { Product } from '@/payload-types'

export default function PixelViewContent({ product }: { product: Product }) {
  return (
    <TriggerMetaPixel
      event="ViewContent"
      data={{
        content_ids: [product.id],
        content_name: product.title,
        content_type: 'product_group',
      }}
    />
  )
}
