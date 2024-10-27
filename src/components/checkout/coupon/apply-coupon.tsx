'use client'

import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import Price from '@/components/product/price'
import { isCouponApplicable } from '@/features/checkout/utils'
import { getApplicableCoupon } from '@/features/server/actions/coupon'
import { useToastStore } from '@/features/toast/store'
import { Coupon } from '@/payload-types'
import { useState, type FC } from 'react'

interface CheckoutApplyCouponProps {
  coupon?: Coupon
  onSuccess?: (coupon: Coupon) => void
  subtotal?: number
}

const CheckoutApplyCoupon: FC<CheckoutApplyCouponProps> = ({ coupon, onSuccess, subtotal = 0 }) => {
  const [text, setText] = useState('')
  const [isLoading, setLoading] = useState(false)
  const addToast = useToastStore((state) => state.addToast)

  const applyCustomCoupon = async () => {
    if (!text) {
      addToast('Empty coupon is not allowed', 'error')
      return
    }

    setLoading(true)
    const fetchedCoupon = await getApplicableCoupon(text)
    if(!fetchedCoupon) {
      setLoading(false)
      addToast(`Invalid Coupon: ${text.toUpperCase()}`, 'error')
      return
    }

    const isApplicable = isCouponApplicable(fetchedCoupon, subtotal)
    if (!isApplicable) {
      addToast(
        <span>
          Add more items worth <Price price={(fetchedCoupon?.min_cart_value || 0) - subtotal} /> to
          use this coupon
        </span>,
        'error',
      )
    } else if (fetchedCoupon) {
      onSuccess?.(fetchedCoupon)
    }
    setLoading(false)
  }

  return coupon ? (
    <>
      <Button small onClick={() => onSuccess?.(coupon)}>
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
        disabled={isLoading}
        onChange={(e) => {
          e.preventDefault()
          setText(e.target.value)
        }}
      />
      <Button
        disabled={isLoading}
        onClick={async (e) => {
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
