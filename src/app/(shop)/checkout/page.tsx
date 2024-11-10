import CheckoutForm from '@/components/checkout/form'
import CheckoutUser from '@/components/checkout/user'
import CheckoutAddress from '@/components/checkout/address'
import CheckoutCoupons from '@/components/checkout/coupon'
import Section from '@/components/section'
import CheckoutProductSection from '@/components/checkout/product/section'
import CheckoutShipping from '@/components/checkout/shipping'
import CheckoutCouponSummary from '@/components/checkout/coupon/summary'
import CheckoutTotal from '@/components/checkout/total'
import CheckoutPaymentButton from '@/components/checkout/payment-button'

const CheckoutPage = async () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl md:mb-10 mb-5">Checkout</h1>
        <CheckoutForm>
          <div className="flex justify-center items-start lg:flex-row flex-col lg:gap-10">
            <div className="lg:w-1/2 w-full">
              <CheckoutUser />
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
        </CheckoutForm>
      </div>
    </div>
  )
}

export default CheckoutPage
