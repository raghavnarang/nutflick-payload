'use client'

import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import Price from '@/components/product/price'
import { useCheckoutStore } from '@/features/checkout/provider-client'
import { isCouponApplicable } from '@/features/checkout/utils'
import { getApplicableCoupon } from '@/features/server/actions/coupon'
import { useToastStore } from '@/features/toast/store'
import { Coupon } from '@/payload-types'
import { useState, useTransition, type FC } from 'react'

interface CheckoutApplyCouponProps {
  coupon?: Coupon
  onSuccess?: (coupon: Coupon) => void
  subtotal?: number
}

const CheckoutApplyCoupon: FC<CheckoutApplyCouponProps> = ({ coupon, onSuccess, subtotal = 0 }) => {
  const [text, setText] = useState('')
  const [pending, startTransition] = useTransition()
  const addToast = useToastStore((state) => state.addToast)
  const { guestEmail, guestEmailMode } = useCheckoutStore((state) => state)

  const applyCustomCoupon = (shouldApplyProp = false) => {
    const couponToApply = shouldApplyProp ? coupon?.coupon : text
    if (!couponToApply) {
      addToast('Empty coupon is not allowed', 'error')
      setText('')
      return
    }

    startTransition(async () => {
      const fetchedCoupon = await getApplicableCoupon(couponToApply, guestEmail)
      if (!fetchedCoupon) {
        addToast(
          `Coupon is not usable right now or is invalid: ${couponToApply.toUpperCase()}`,
          'error',
        )
        setText('')
        return
      }

      const isApplicable = isCouponApplicable(fetchedCoupon, subtotal)
      if (!isApplicable) {
        addToast(
          <span>
            Add more items worth <Price price={(fetchedCoupon?.min_cart_value || 0) - subtotal} />{' '}
            to use this coupon
          </span>,
          'info',
        )
        setText('')
      } else if (fetchedCoupon) {
        onSuccess?.(fetchedCoupon)
      }
    })
  }

  return coupon ? (
    <>
      <Button
        small
        disabled={pending}
        onClick={(e) => {
          e.preventDefault()
          applyCustomCoupon(true)
        }}
      >
        Apply
      </Button>
    </>
  ) : (
    <div className="flex justify-between w-full sm:gap-5 gap-3 md:px-8 px-4 py-5">
      <Textbox
        name="coupon"
        placeholder="Enter Coupon Name"
        outerWrapperClassname="flex-grow"
        required
        value={text}
        disabled={pending}
        onChange={(e) => {
          e.preventDefault()
          setText(e.target.value)
        }}
      />
      <Button
        disabled={pending}
        onClick={(e) => {
          e.preventDefault()
          applyCustomCoupon()
        }}
      >
        Apply
      </Button>
    </div>
  )
}

export default CheckoutApplyCoupon
