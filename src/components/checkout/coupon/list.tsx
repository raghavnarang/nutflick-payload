import Button from '@/components/button'
import Section from '@/components/section'
import SectionFooter from '@/components/section/footer'
import type { FC } from 'react'
import CheckoutDisplayCoupon from './display-coupon'
import CheckoutApplyCoupon from './apply-coupon'
import type { Coupon } from '@/payload-types'

interface CheckoutCouponsListProps {
  onCancel?: () => void
  onSuccess?: (coupon: Coupon) => void
  subtotal?: number
  coupons: Coupon[]
}

const CheckoutCouponsList: FC<CheckoutCouponsListProps> = ({
  onCancel,
  onSuccess,
  subtotal = 0,
  coupons,
}) => {
  return (
    <Section title="Coupons">
      <CheckoutApplyCoupon onSuccess={onSuccess} subtotal={subtotal} />
      {coupons.map((coupon) => (
        <CheckoutDisplayCoupon
          key={coupon.id}
          {...coupon}
          subtotal={subtotal}
          onSuccess={onSuccess}
        />
      ))}
      <SectionFooter>
        <Button onClick={onCancel} isSecondary>
          Cancel
        </Button>
      </SectionFooter>
    </Section>
  )
}

export default CheckoutCouponsList
