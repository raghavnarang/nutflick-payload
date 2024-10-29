import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'
import type { Order } from '@/payload-types'
import OrderTransitStatus from './transit'
import OrderConfirmedStatus from './confirmed'
import OrderFailedStatus from './failed'
import OrderRefundedStatus from './refunded'
import OrderUnknownStatus from './unknown'
import { getPaymentStatus } from '@/features/razorpay/api'

export default async function OrderStatus({ order }: { order: Order }) {
  if (!order.razorpay?.orderId || !order.razorpay.paymentId) {
    return <OrderUnknownStatus order={order} />
  }

  const status = await getPaymentStatus(order.razorpay.paymentId)
  switch (status) {
    case RazorpayPaymentStatus.AUTHORIZED:
      return <OrderTransitStatus order={order} />
    case RazorpayPaymentStatus.CAPTURED:
      return <OrderConfirmedStatus order={order} />
    case RazorpayPaymentStatus.FAILED:
      return <OrderFailedStatus order={order} />
    case RazorpayPaymentStatus.REFUNDED:
      return <OrderRefundedStatus order={order} />
    default:
      return <OrderUnknownStatus order={order} />
  }
}
