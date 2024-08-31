import Image from 'next/image'
import { Suspense, type FC } from 'react'
import Price from './price'
import Link from 'next/link'
import Photo from '../Icons/photo'
import AddToCart from '../cart/add-to-cart'
import type { Product } from '@/payload-types'

interface ProductItemProps {
  product: Product
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const link = `/product/${product.slug}`

  return (
    <div className="w-full">
      <Link href={link} className="w-full 2xl:h-72 xl:h-60 sm:h-52 h-72 relative mb-5 block">
        {typeof product.image != 'number' && product.image && product.image.url ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            className="object-cover rounded-lg z-0"
          />
        ) : (
          <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
            <Photo className="!size-10 text-gray-400" />
          </div>
        )}
      </Link>

      <Link href={link}>
        {product.category && typeof product.category.value !== 'number' && (
          <span className="block mb-1 text-gray-600 text-sm">{product.category.value.title}</span>
        )}
        <span className="block">{product.title}</span>
      </Link>

      {product.variants && product.variants.length > 0 && (
        <div className="mt-3">
          {product.variants[0].comparePrice && (
            <Price
              price={product.variants[0].comparePrice}
              className="line-through text-gray-500"
            />
          )}
          <Price price={product.variants[0].price} className="text-xl ml-2" />
        </div>
      )}
      <div className="mt-3">
        <Suspense>
          <AddToCart product={product} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductItem
