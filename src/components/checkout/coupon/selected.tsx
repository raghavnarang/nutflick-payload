import { Tick } from '@/components/Icons'
import Price from '@/components/product/price'
import type { Coupon } from '@/payload-types'
import type { FC } from 'react'
import Button from '@/components/button'
import Trash from '@/components/Icons/trash'
import { getDiscountValue } from '@/features/checkout/utils'

interface CheckoutCouponSelectedProps extends Coupon {
  subtotal: number
  onRemoveClick?: () => void
}

const CheckoutCouponSelected: FC<CheckoutCouponSelectedProps> = ({
  onRemoveClick,
  subtotal,
  ...coupon
}) => {
  const discount = getDiscountValue(coupon, subtotal)

  return (
    <div className="flex flex-col sm:flex-row justify-between md:items-center items-start w-full gap-5 md:px-8 px-4 py-5 bg-gray-50 rounded-lg mb-10">
      <div className="flex items-center gap-2">
        <Tick className="text-green-600 inline-block !size-8 flex-shrink-0" />
        <p>
          You saved <Price price={discount} className="text-green-600 font-semibold" /> with{' '}
          <span className="font-semibold">&apos;{coupon.coupon.toUpperCase()}&apos;</span>
        </p>
      </div>
      <Button
        isSecondary
        icon={Trash}
        small
        onClick={(e) => {
          e.preventDefault()
          onRemoveClick?.()
        }}
      >
        Remove
      </Button>
    </div>
  )
}

export default CheckoutCouponSelected
