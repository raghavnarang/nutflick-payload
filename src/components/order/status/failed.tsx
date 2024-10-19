import Error from '@/components/Icons/error'
import type { Order } from '@/payload-types'

export default function OrderRefundedStatus({ order }: { order: Order }) {
  const paymentIdText = order.razorpay?.paymentId ? `| Payment: ${order.razorpay.paymentId}` : ''

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-7 w-full">
      <Error className="text-red-500 !size-14" />
      <div className="text-center md:text-start">
        <p className="text-2xl">Your Payment is failed</p>
        <p className="text-gray-500 text-sm">
          If money is deducted from your bank, it will be refunded within 3-5 business days
        </p>
        <p className="text-sm text-gray-500">
          Order: #{order.id} {paymentIdText}
        </p>
      </div>
    </div>
  )
}
