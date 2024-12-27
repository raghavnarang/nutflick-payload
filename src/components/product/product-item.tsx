import Image from 'next/image'
import { type FC } from 'react'
import Price from './price'
import Link from 'next/link'
import Photo from '../Icons/photo'
import type { Product } from '@/payload-types'
import { getProductRange } from '@/utils/misc'
import ProductItemCartControls from '../cart/controls/product-item'

interface ProductItemProps {
  product: Product
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const link = `/product/${product.slug}`
  const { lowPrice, highPrice, lowVariantTitle, highVariantTitle } = getProductRange(product)

  return (
    <div className="w-full flex flex-col justify-between">
      <div>
        <Link
          href={link}
          className="w-full 2xl:h-64 xl:h-60 sm:h-52 md:h-72 h-36 relative mb-5 block"
        >
          {typeof product.image != 'number' && product.image && product.image.url ? (
            <Image
              src={product.image.url}
              alt={product.image.alt || product.title}
              fill
              priority
              quality={50}
              className="object-contain rounded-lg z-0"
              sizes="(max-width: 639px) 40vw,(max-width: 1023px) 30vw,(max-width: 1279px) 20vw, 15vw"
            />
          ) : (
            <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
              <Photo className="!size-10 text-gray-400" />
            </div>
          )}
        </Link>

        <Link href={link}>
          {product.category && typeof product.category.value !== 'number' && (
            <span className="block mb-1 text-gray-600 md:text-sm text-xs">
              {product.category.value.title}
            </span>
          )}
          <span className="block font-medium md:text-base text-sm">{product.title}</span>
        </Link>
      </div>
      <div>
        {product.variants && product.variants.length > 0 && (
          <div className="md:mt-3 mt-2 flex flex-col gap-1">
            <p>
              <Price price={lowPrice} className="md:text-xl text-base mr-2 font-bold" />
              {lowPrice !== highPrice && highPrice > 0 && (
                <>
                  <span className="md:text-xl text-base mr-2 font-bold">-</span>
                  <Price price={highPrice} className="md:text-xl text-base mr-2 font-bold" />
                </>
              )}
            </p>
            <p className="text-primary font-semibold text-sm">
              {lowVariantTitle}
              {highVariantTitle && lowVariantTitle !== highVariantTitle && ` - ${highVariantTitle}`}
            </p>
          </div>
        )}
        <ProductItemCartControls product={product} />
      </div>
    </div>
  )
}

export default ProductItem
