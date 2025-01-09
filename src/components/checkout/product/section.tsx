'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import CheckoutProduct from './product'

const CheckoutProductSection = ({ removeForm = false }: { removeForm?: boolean }) => {
  const cart = useCartStore((state) => state.cart)
  return (
    <>
      {cart.items.map((item, index) => (
        <CheckoutProduct
          key={item.variantId}
          {...item}
          name={`products[${index}]`}
          removeForm={removeForm}
        />
      ))}
    </>
  )
}

export default CheckoutProductSection
