'use client'

import { Product } from '@/payload-types'
import useAddToCart from './hooks/add-to-cart'
import Button from '@/components/button'
import QuantitySelectorUI from '../quantity-selector-ui'

export default function VariantSelectorCartControls({ product }: { product: Product }) {
  const { inCart, addToCart, qty, decrement, increment, clear } = useAddToCart(product)

  if (!inCart) {
    return (
      <div className="mt-2">
        <Button small onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-2 flex items-start md:items-center justify-between">
      <QuantitySelectorUI qty={qty} onMinusClick={decrement} onPlusClick={increment} />
      <Button small isSecondary onClick={clear}>
        Remove
      </Button>
    </div>
  )
}
