import Warning from '@/components/Icons/warning'
import type { Order } from '@/payload-types'

export default function OrderTransitStatus({ order }: { order: Order }) {
  const paymentIdText = order.razorpay?.paymentId ? `| Payment: ${order.razorpay.paymentId}` : ''

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-7 w-full">
      <Warning className="text-yellow-500 !size-14" />
      <div className="text-center md:text-start">
        <p className="text-2xl">Your Payment is in transit</p>
        <p className="text-gray-500 text-sm">Please check status after sometime</p>
        <p className="text-gray-500 text-sm">
          Order: #{order.id} {paymentIdText}
        </p>
      </div>
    </div>
  )
}
