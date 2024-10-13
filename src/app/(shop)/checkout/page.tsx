'use client'

import EmptyCart from '@/components/cart/empty-cart'
import CheckoutAddress from '@/components/checkout/address'
import CheckoutCoupons from '@/components/checkout/coupon'
import CheckoutCouponSummary from '@/components/checkout/coupon/summary'
import CheckoutProductSection from '@/components/checkout/product/section'
import CheckoutShipping from '@/components/checkout/shipping'
import Section from '@/components/section'
import { useCartStore } from '@/features/cart/cart-store/provider'

const CheckoutPage = () => {
  const cart = useCartStore((state) => state.cart)

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl mb-10">Checkout</h1>
        {(!cart || cart.items.length === 0) && <EmptyCart />}
        <form>
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
              </Section>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
