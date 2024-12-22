'use client'

import { Product } from '@/payload-types'
import useAddToCart from './hooks/add-to-cart'
import Button from '@/components/button'
import QuantitySelectorUI from '../quantity-selector-ui'

export default function ProductPageCartControls({ product }: { product: Product }) {
  const { inCart, addToCart, qty, decrement, increment, clear } = useAddToCart(product)

  if (!inCart) {
    return (
      <div className="md:max-w-xs mb-5">
        <p className="md:text-lg font-medium mb-3">Cart Actions</p>
        <Button large onClick={addToCart} className="h-14">
          Add to Cart
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-xs mb-5">
      <p className="md:text-lg font-medium mb-3">Quantity in Cart</p>
      <div className="mt-2 h-14">
        <div className="flex items-center gap-5">
          <QuantitySelectorUI qty={qty} onMinusClick={decrement} onPlusClick={increment} />
          <Button isSecondary onClick={clear} className='md:text-base text-sm'>
            Remove from Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
