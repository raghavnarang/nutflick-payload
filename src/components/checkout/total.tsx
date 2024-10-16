'use client'

import Price from '../product/price'
import SectionTitleValue from '../section/title-value'
import { useCheckoutStore } from '@/features/checkout/store'
import { getDiscountValue, useCartSubtotal, useGetShippingCovered } from '@/features/checkout/utils'

const CheckoutTotal = () => {
  const { selectedCoupon: coupon, selectedShipping: shipping } = useCheckoutStore((state) => state)
  const subtotal = useCartSubtotal()

  const shippingAlreadyCovered = useGetShippingCovered()
  let shippingCost = (shipping?.rate || 0) - shippingAlreadyCovered
  shippingCost = shippingCost <= 0 ? 0 : shippingCost

  const discount = coupon && getDiscountValue(coupon, subtotal)
  const total = subtotal + shippingCost - (discount || 0)

  return (
    <SectionTitleValue title="Total">
      <Price price={total} />
    </SectionTitleValue>
  )
}

export default CheckoutTotal
