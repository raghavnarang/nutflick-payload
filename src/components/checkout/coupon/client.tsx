'use client'

import { useEffect, useState } from 'react'
import CheckoutCouponsList from './list'
import CheckoutCouponNonSelected from './non-selected'
import CheckoutCouponSelected from './selected'
import { useCheckoutStore } from '@/features/checkout/store'
import { useToastStore } from '@/features/toast/store'
import { isCouponApplicable, useCartSubtotal } from '@/features/checkout/utils'
import Price from '@/components/product/price'
import { Coupon } from '@/payload-types'

enum CouponMode {
  DEFAULT,
  APPLY,
}

const CheckoutCouponsClient = ({ coupons }: { coupons: Coupon[] }) => {
  const [mode, setMode] = useState(CouponMode.DEFAULT)
  const { selectedCoupon: selected, setSelectedCoupon: setSelected } = useCheckoutStore(
    (state) => state,
  )

  const subtotal = useCartSubtotal()

  const addToast = useToastStore((state) => state.addToast)

  // Check coupon eligibility on subtotal value change, remove if not applicable
  useEffect(() => {
    if (selected) {
      const isCouponStillApplicable = isCouponApplicable(selected, subtotal)
      if (!isCouponStillApplicable) {
        const message = (
          <span>
            Coupon {selected.coupon} is removed, Add more items worth{' '}
            <Price price={(selected.min_cart_value || 0) - subtotal} /> to use this coupon
          </span>
        )
        addToast(message, 'info')
        setSelected(undefined)
      }
    }
  }, [subtotal])

  if (mode === CouponMode.APPLY) {
    return (
      <CheckoutCouponsList
        coupons={coupons}
        subtotal={subtotal}
        onCancel={() => setMode(CouponMode.DEFAULT)}
        onSuccess={(coupon) => {
          setSelected(coupon)
          setMode(CouponMode.DEFAULT)
        }}
      />
    )
  }

  if (selected) {
    return (
      <CheckoutCouponSelected
        {...selected}
        subtotal={subtotal}
        onRemoveClick={() => {
          setSelected(undefined)
        }}
      />
    )
  }

  return <CheckoutCouponNonSelected onViewCoupons={() => setMode(CouponMode.APPLY)} />
}

export default CheckoutCouponsClient
