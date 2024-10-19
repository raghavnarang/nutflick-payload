import Refund from '@/components/Icons/refund'
import type { Order } from '@/payload-types'

export default function OrderRefundedStatus({ order }: { order: Order }) {
  const paymentIdText = order.razorpay?.paymentId ? `| Payment: ${order.razorpay.paymentId}` : ''

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-7 w-full">
      <Refund className="text-blue-500 !size-14" />
      <div className="text-center md:text-start">
        <p className="text-2xl">Your Payment is refunded</p>
        <p className="text-gray-500 text-sm">
          It takes 3-5 business days to reach your bank, once refund issued
        </p>
        <p className="text-gray-500 text-sm">
          Order: #{order.id} {paymentIdText}
        </p>
      </div>
    </div>
  )
}
