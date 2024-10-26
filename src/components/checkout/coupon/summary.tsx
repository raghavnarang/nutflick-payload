'use client'

import Price from '@/components/product/price'
import SectionTitleValue from '@/components/section/title-value'
import { useCheckoutStore } from '@/features/checkout/store'
import { getDiscountValue, useCartSubtotal } from '@/features/checkout/utils'

const CheckoutCouponSummary = () => {
  const coupon = useCheckoutStore((state) => state.selectedCoupon)
  const subtotal = useCartSubtotal()
  if (!coupon) {
    return null
  }

  const discount = getDiscountValue(coupon, subtotal)

  return (
    coupon && (
      <SectionTitleValue title={`Discount (${coupon.coupon.toUpperCase()})`}>
        <Price price={discount} negative className='text-green-600 font-semibold' />
        <input type="hidden" name="coupon" value={coupon.coupon} />
      </SectionTitleValue>
    )
  )
}

export default CheckoutCouponSummary
