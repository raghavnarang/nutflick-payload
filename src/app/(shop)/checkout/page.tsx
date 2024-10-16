'use client'

import EmptyCart from '@/components/cart/empty-cart'
import CheckoutAddress from '@/components/checkout/address'
import CheckoutCoupons from '@/components/checkout/coupon'
import CheckoutCouponSummary from '@/components/checkout/coupon/summary'
import CheckoutPaymentButton from '@/components/checkout/payment-button'
import CheckoutProductSection from '@/components/checkout/product/section'
import CheckoutShipping from '@/components/checkout/shipping'
import CheckoutTotal from '@/components/checkout/total'
import Section from '@/components/section'
import { useCartStore } from '@/features/cart/cart-store/provider'
import { placeOrder } from '@/features/server/actions/place-order'
import { useToastStore } from '@/features/toast/store'
import { useTransition } from 'react'
import type { FormEventHandler } from 'react'

const CheckoutPage = () => {
  const cart = useCartStore((state) => state.cart)
  const addToast = useToastStore((state) => state.addToast)
  const [, startTransition] = useTransition()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await placeOrder(new FormData(e.currentTarget))
      if (result) {
        addToast(result.message, result.status)
      }
    })
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl mb-10">Checkout</h1>
        {(!cart || cart.items.length === 0) && <EmptyCart />}
        {cart && cart.items.length > 0 && (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-start lg:flex-row flex-col lg:gap-10">
              <div className="lg:w-1/2 w-full">
                <CheckoutAddress />
                <CheckoutCoupons />
              </div>
              <div className="lg:w-1/2 w-full">
                <Section title="Order Details">
                  <CheckoutProductSection />
                  <CheckoutShipping />
                  <CheckoutCouponSummary />
                  <CheckoutTotal />
                </Section>
                <CheckoutPaymentButton />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
