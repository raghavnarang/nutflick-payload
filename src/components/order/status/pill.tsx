import StatusPill, { StatusPillType } from '@/components/pill-status'
import type { Order } from '@/payload-types'

export default async function OrderStatusPill({ order }: { order: Order }) {
  if (!order.razorpay?.orderId || !order.razorpay.paymentId) {
    return <StatusPill type={StatusPillType.ERROR} text="Payment not done" />
  }

  switch (order.afterOrder?.status) {
    case 'completed':
      return <StatusPill type={StatusPillType.SUCCESS} text="Completed" />
    case 'processing':
      return <StatusPill type={StatusPillType.INFO} text="Processing" />
    case 'shipped':
      return <StatusPill type={StatusPillType.SUCCESS} text="Shipped" />
    default:
      return null
  }
}
