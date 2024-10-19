import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'
import type { Order, ShippingOption } from '@/payload-types'
import OrderTransitStatus from './transit'
import OrderConfirmedStatus from './confirmed'
import OrderFailedStatus from './failed'
import OrderRefundedStatus from './refunded'

export default function OrderStatus(props: {
  order: Order
  shipping?: ShippingOption['option'][0]
  status: RazorpayPaymentStatus
}) {
  switch (props.status) {
    case RazorpayPaymentStatus.AUTHORIZED:
      return <OrderTransitStatus {...props} />
    case RazorpayPaymentStatus.CAPTURED:
      return <OrderConfirmedStatus {...props} />
    case RazorpayPaymentStatus.FAILED:
      return <OrderFailedStatus {...props} />
    case RazorpayPaymentStatus.REFUNDED:
      return <OrderRefundedStatus {...props} />
    default:
      return null
  }
}
