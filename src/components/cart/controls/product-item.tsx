'use client'

import { Product } from '@/payload-types'
import useAddToCart from './hooks/add-to-cart'
import Button from '@/components/button'
import QuantitySelectorUI from '../quantity-selector-ui'
import clsx from 'clsx'

export default function ProductItemCartControls({ product }: { product: Product }) {
  const { inCart, addToCart, qty, decrement, increment } = useAddToCart(product)
  if (!product.variants || product.variants.length === 0) {
    return null
  }

  if (!inCart) {
    return (
      <>
        <Button
          small
          onClick={addToCart}
          className={clsx('mt-3', { 'mb-6': (product.variants?.length || 0) <= 1 })}
        >
          Add to Cart
        </Button>
        {(product.variants?.length || 0) > 1 && (
          <p className="text-xs text-gray-600 mt-2">{product.variants?.length} options available</p>
        )}
      </>
    )
  }

  return (
    <>
      <QuantitySelectorUI
        qty={qty}
        onMinusClick={decrement}
        onPlusClick={increment}
        className={clsx('mt-3 h-9', { 'mb-6': (product.variants?.length || 0) <= 1 })}
      />
      {(product.variants?.length || 0) > 1 && (
        <p className="text-xs text-gray-600 mt-2 h-4 flex items-center gap-1">
          Tap <span className="text-primary font-bold text-lg">+</span> for more options
        </p>
      )}
    </>
  )
}
