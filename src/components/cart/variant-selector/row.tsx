import Price from '@/components/product/price'
import type { Product } from '@/payload-types'
import type { FC } from 'react'
import Image from 'next/image'
import VariantSelectorCartControls from '../controls/variant-selector'

interface VariantSelectorRowProps {
  variant: NonNullable<Product['variants']>[number]
  product: Product
}

const VariantSelectorRow: FC<VariantSelectorRowProps> = ({ variant, product }) => {
  const variantImage = typeof variant.image !== 'number' ? variant.image : undefined
  const productImage = typeof product.image !== 'number' ? product.image : undefined

  const image = variantImage || productImage

  return (
    <div className="py-4 md:py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start">
        {image?.url && (
          <Image
            width={96}
            height={96}
            quality={50}
            src={image.url}
            alt={image.alt}
            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
          />
        )}
        <div className="ml-4 md:ml-6 flex-grow flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 text-base">{variant.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.title}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-gray-900">
                <Price price={variant.price} />
              </p>
              {variant.comparePrice && (
                <p className="text-sm text-gray-500 line-through">
                  <Price price={variant.comparePrice} />
                </p>
              )}
            </div>
          </div>
          <VariantSelectorCartControls product={{ ...product, variants: [variant] }} />
        </div>
      </div>
    </div>
  )
}

export default VariantSelectorRow
