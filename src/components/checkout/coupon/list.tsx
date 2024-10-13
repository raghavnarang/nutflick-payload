import LoadingAnimated from '@/components/Icons/loading-animated'
import BigMessage from '@/components/big-message'
import Button from '@/components/button'
import Section from '@/components/section'
import SectionBody from '@/components/section/body'
import SectionFooter from '@/components/section/footer'
import { useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { Error } from '@/components/Icons'
import CheckoutDisplayCoupon from './display-coupon'
import CheckoutApplyCoupon from './apply-coupon'
import useFetchCoupons from '@/features/react-query/queries/coupons'
import type { Coupon } from '@/payload-types'

interface CheckoutCouponsListProps {
  onCancel?: () => void
  onSuccess?: (coupon: Coupon) => void
  subtotal?: number
}

const CheckoutCouponsList: FC<CheckoutCouponsListProps> = ({
  onCancel,
  onSuccess,
  subtotal = 0,
}) => {
  const queryClient = useQueryClient()

  const { data: coupons, isLoading, isError } = useFetchCoupons()

  if (isLoading) {
    return (
      <Section title="Coupons">
        <SectionBody className="flex justify-center items-center h-32">
          <LoadingAnimated />
        </SectionBody>
      </Section>
    )
  }

  if (isError || !coupons) {
    return (
      <SectionBody>
        <BigMessage
          icon={Error}
          button={{
            text: 'Try Again',
            onClick: () => {
              queryClient.invalidateQueries({ queryKey: ['coupons'] })
            },
          }}
        >
          Something Went Wrong. Unable to load addresses.
        </BigMessage>
      </SectionBody>
    )
  }

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
