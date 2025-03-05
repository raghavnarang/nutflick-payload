import BlockSection from '@/components/block-section'
import ProductGrid from '@/components/product/product-grid'
import type { Product } from '@/payload-types'
import clsx from 'clsx'

interface BlockProps {
  title: string
  subtitle: string
  products: Product[]
  hideBorderBottom?: boolean
}

export default async function ProductsBlockComponent({
  products,
  title,
  subtitle,
  hideBorderBottom,
}: BlockProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <BlockSection
      title={title}
      subtitle={subtitle}
      className={clsx({ '!border-b-0': hideBorderBottom })}
    >
      <ProductGrid products={products} />
    </BlockSection>
  )
}
