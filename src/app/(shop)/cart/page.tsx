'use client'

import CartItem from '@/components/cart/cart-item'
import CartSummary from '@/components/cart/cart-summary'
import EmptyCart from '@/components/cart/empty-cart'
import { useCartStore } from '@/features/cart/cart-store/provider'

const Cart = () => {
  const cart = useCartStore((state) => state.cart)

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl mb-10">Cart</h1>

        {(!cart || cart.items.length === 0) && <EmptyCart />}

        {cart && cart.items.length > 0 && (
          <div className="flex justify-center items-start lg:flex-row flex-col">
            <div className="lg:w-2/3 lg:mr-10 w-full">
              {cart.items.map((line) => (
                <CartItem item={line} key={line.variantId} />
              ))}
            </div>
            <CartSummary cart={cart} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
