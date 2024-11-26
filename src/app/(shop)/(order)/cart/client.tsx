'use client'

import CartItem from '@/components/cart/cart-item'
import CartSummary from '@/components/cart/cart-summary'
import EmptyCart from '@/components/cart/empty-cart'
import { useCartStore } from '@/features/cart/cart-store/provider'

export default function CartClient() {
  const cart = useCartStore((state) => state.cart)

  return cart && cart.items.length > 0 ? (
    <div className="flex justify-center items-start lg:flex-row flex-col">
      <div className="lg:w-2/3 lg:mr-10 w-full">
        {cart.items.map((line) => (
          <CartItem item={line} key={line.variantId} />
        ))}
      </div>
      <CartSummary cart={cart} />
    </div>
  ) : (
    <EmptyCart />
  )
}
