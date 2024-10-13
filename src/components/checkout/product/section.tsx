'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import CheckoutProduct from './product'

const CheckoutProductSection = () => {
  const cart = useCartStore((state) => state.cart)
  return (
    <>
      {cart.items.map((item) => (
        <CheckoutProduct key={item.variantId} {...item} />
      ))}
    </>
  )
}

export default CheckoutProductSection
