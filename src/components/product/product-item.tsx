import Image from 'next/image'
import { type FC } from 'react'
import Price from './price'
import Link from 'next/link'
import Photo from '../Icons/photo'
import AddToCart from '../cart/add-to-cart'
import type { Product } from '@/payload-types'
import GoToCart from './go-to-cart'
import InfoStatusPill from '../pill-status/info'

interface ProductItemProps {
  product: Product
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const link = `/product/${product.slug}`

  return (
    <div className="w-full">
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
            className="object-contain rounded-lg z-0"
            sizes="(max-width: 639px) 50vw,(max-width: 1023px) 33vw,(max-width: 1279px) 25vw, 20vw"
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
        <span className="block">{product.title}</span>
      </Link>

      {product.variants && product.variants.length > 0 && (
        <div className="md:mt-3 mt-2 flex items-center justify-between">
          <p>
            <Price
              price={product.variants[0].price}
              className="md:text-xl text-base mr-2 font-bold"
            />
            {product.variants[0].comparePrice && (
              <Price
                price={product.variants[0].comparePrice}
                className="line-through md:text-base text-sm text-gray-500"
              />
            )}
          </p>
          <InfoStatusPill text={product.variants[0].title} />
        </div>
      )}
      <div className="mt-3 flex justify-between items-start">
        <AddToCart product={product} disableRemove />
        <GoToCart product={product} className="hidden md:block" />
      </div>
    </div>
  )
}

export default ProductItem
