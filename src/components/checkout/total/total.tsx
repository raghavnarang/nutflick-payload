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
  freeShippingSettings,
}: {
  defaultShipping?: ShippingOption['option'][number]
  freeShippingSettings: ShippingOption['freeShippingSettings']
}) => {
  const cart = useCartStore((state) => state.cart)
  const { selectedCoupon: coupon, selectedShipping: storeShipping } = useCheckoutStore(
    (state) => state,
  )
  const subtotal = useCartSubtotal()

  const shipping = storeShipping || defaultShipping
  const rate = shipping ? getApplicableShippingRate(cart.items, shipping) : 0
  const cost = getAdjustedShippingRate(cart.items, rate, freeShippingSettings)

  const discount = coupon && getDiscountValue(coupon, subtotal)
  const total = subtotal + cost - (discount || 0)

  return (
    <SectionTitleValue title="Total">
      <div className='flex flex-col items-end'>
        <Price price={total} className='font-bold' />
        <span className='text-xs '>(Inclusive of GST)</span>
      </div>
    </SectionTitleValue>
  )
}

export default CheckoutTotalClient
