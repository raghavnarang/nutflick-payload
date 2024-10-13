'use client'

import type { CartItem } from '@/shared/types/cart'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import Photo from '@/components/Icons/photo'
import Price from '@/components/product/price'
import EditCartItem from '@/components/cart/edit-cart-item'

const CheckoutProduct: FC<CartItem> = (item) => {
  const itemLink = `/product/${item.productSlug}/${item.variantSlug}`
  return (
    <div className="flex justify-between items-center border-b border-solid border-gray-200 md:px-8 px-4 py-4">
      <div className="flex">
        <Link
          href={itemLink}
          className="w-20 h-20 relative mr-5 flex-shrink-0 rounded-lg border border-gray-300"
        >
          {item.image ? (
            <Image src={item.image} fill alt={item.title} className="object-cover rounded-md" />
          ) : (
            <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
              <Photo className="!size-10 text-gray-400" />
            </div>
          )}
        </Link>
        <div className="flex flex-col justify-between">
          <div>
            {item.category && (
              <span className="block text-gray-500 text-sm mb-1">{item.category}</span>
            )}
            <Link
              href={itemLink}
              className="block mb-1 text-sm md:text-base font-bold md:font-normal"
            >
              {item.title}
            </Link>
            <Price price={item.price} className="block text-gray-600 text-sm md:text-base" />
            <div className="mt-2 flex gap-3">
              <EditCartItem cartItem={item} className="!justify-start" />
            </div>
          </div>

          <Price price={item.price * item.qty} className="text-base md:hidden block mt-4" />
        </div>
      </div>

      <Price price={item.price * item.qty} className="text-right hidden md:block" />
      <input
        type="hidden"
        name={`products[${item.productId}][${item.variantId}]`}
        value={item.qty}
      />
    </div>
  )
}

export default CheckoutProduct
