'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import Price from '@/components/product/price'
import SectionTitleValue from '@/components/section/title-value'
import { useCheckoutStore } from '@/features/checkout/provider-client'
import {
  getAdjustedShippingRate,
  getApplicableShippingRate,
  getDiscountValue,
  useCartSubtotal,
} from '@/features/checkout/utils'
import { ShippingOption } from '@/payload-types'

const CheckoutTotalClient = ({
  defaultShipping,
}: {
  defaultShipping?: ShippingOption['option'][number]
}) => {
  const cart = useCartStore((state) => state.cart)
  const { selectedCoupon: coupon, selectedShipping: storeShipping } = useCheckoutStore(
    (state) => state,
  )
  const subtotal = useCartSubtotal()

  const shipping = storeShipping || defaultShipping
  const rate = shipping ? getApplicableShippingRate(cart.items, shipping) : 0
  const cost = getAdjustedShippingRate(cart.items, rate)

  const discount = coupon && getDiscountValue(coupon, subtotal)
  const total = subtotal + cost - (discount || 0)

  return (
    <SectionTitleValue title="Total">
      <Price price={total} />
    </SectionTitleValue>
  )
}

export default CheckoutTotalClient
