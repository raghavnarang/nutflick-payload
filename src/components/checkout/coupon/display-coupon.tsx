import Button from '@/components/button'
import Price from '@/components/product/price'
import type { FC } from 'react'
import cx from 'clsx'
import CheckoutApplyCoupon from './apply-coupon'
import type { Coupon } from '@/payload-types'
import { isCouponApplicable } from '@/features/checkout/utils'

interface CheckoutDisplayCouponProps
  extends Omit<Coupon, 'max_use' | 'is_active' | 'checkout_visible' | 'created_at'> {
  subtotal: number
  onSuccess?: (coupon: Coupon) => void
}

const CheckoutDisplayCoupon: FC<CheckoutDisplayCouponProps> = (props) => {
  const isApplicable = isCouponApplicable(props, props.subtotal)
  return (
    <div className="border-t border-gray-200 md:px-8 px-4 py-5" key={props.id}>
      <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-5 gap-3 mb-3">
        <span
          className={cx(
            'uppercase font-semibold tracking-widest border-4 border-dashed rounded-lg px-3 py-1',
            {
              'border-red-400': isApplicable,
              'border-gray-300': !isApplicable,
            },
          )}
        >
          {props.coupon}
        </span>
        <div className="sm:text-right text-center">
          <p className="font-semibold">
            {props.type === 'fixed' ? <Price price={props.value} /> : `${props.value}%`} off
          </p>
          {props.max_discount && (
            <p className="text-gray-600 text-sm">
              upto <Price price={props.max_discount} />
            </p>
          )}
        </div>
      </div>
      <div
        className={cx('flex items-center flex-col-reverse sm:flex-row', {
          'justify-end': isApplicable,
          'justify-between gap-5': !isApplicable,
        })}
      >
        {!isApplicable && (
          <span className="border border-blue-300 text-blue-800 bg-blue-100 text-sm rounded px-3 py-1 inline-block">
            Add more items worth <Price price={(props.min_cart_value || 0) - props.subtotal} /> to
            use this coupon
          </span>
        )}
        {!isApplicable ? (
          <Button small disabled>
            Apply
          </Button>
        ) : (
          <CheckoutApplyCoupon
            coupon={props}
            onSuccess={props.onSuccess}
            subtotal={props.subtotal}
          />
        )}
      </div>
    </div>
  )
}

export default CheckoutDisplayCoupon
