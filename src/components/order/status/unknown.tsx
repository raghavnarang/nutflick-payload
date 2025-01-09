import Question from '@/components/Icons/question'
import type { Order } from '@/payload-types'

export default function OrderUnknownStatus({ order }: { order: Order }) {
  const paymentIdText = order.razorpay?.paymentId ? `| Payment: ${order.razorpay.paymentId}` : ''

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-7 w-full">
      <Question className="text-blue-500 !size-14" />
      <div className="text-center md:text-start">
        <p className="text-2xl">Payment status is unknown</p>
        <p className="text-gray-500 text-sm">
          Please contact us for more information: +91-7340803995
        </p>
        <p className="text-gray-500 text-sm">
          Order: #{order.id} {paymentIdText}
        </p>
      </div>
    </div>
  )
}
