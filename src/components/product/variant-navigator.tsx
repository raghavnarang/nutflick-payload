'use client'

import type { Product } from '@/payload-types'
import cx from 'clsx'
import { useSearchParams } from 'next/navigation'
import Price from './price'
import ProductPageCartControls from '../cart/controls/product-page'

export default function ProductVariantNavigator({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const searchParams = useSearchParams()

  if (!product.variants || product.variants.length === 0) {
    return null
  }

  const slug = searchParams.get('size')

  const selectedVariant =
    (slug &&
      product.variants?.find((variant) => variant.slug?.toLowerCase() === slug.toLowerCase())) ||
    product.variants![0]

  return (
    <>
      <div className="flex items-center gap-3 md:mb-7 mb-5">
        <Price price={selectedVariant.price} className="font-bold md:text-2xl text-xl" />
        {selectedVariant.comparePrice && (
          <Price
            price={selectedVariant.comparePrice}
            className="line-through text-gray-500 md:text-lg"
          />
        )}
      </div>

      <div className="md:mb-5 mb-3">
        <p className="md:text-lg font-medium mb-3">Package Size</p>
        <div className={className}>
          {product.variants.map((v) => (
            <button
              key={v.id}
              className={cx(
                'rounded md:px-4 px-3 py-2 mr-3 last:mr-0 transition-colors inline-block text-sm md:text-base md:mb-0 mb-2',
                {
                  'text-gray-700 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 border border-gray-100':
                    selectedVariant.slug !== v.slug,
                  'text-primary bg-primary-fade border-primary border':
                    selectedVariant.slug === v.slug,
                },
              )}
              onClick={(e) => {
                e.preventDefault()
                window.history.replaceState({}, '', `/product/${product.slug}?size=${v.slug}`)
              }}
            >
              {v.title}
            </button>
          ))}
        </div>
      </div>
      <ProductPageCartControls product={{ ...product, variants: [selectedVariant] }} />
    </>
  )
}
