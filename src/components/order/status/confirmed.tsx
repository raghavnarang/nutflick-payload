import { Tick } from '@/components/Icons'
import type { Order, ShippingOption } from '@/payload-types'

export default function OrderConfirmedStatus({
  order,
  shipping,
}: {
  order: Order
  shipping?: ShippingOption['option'][0]
}) {
  const paymentIdText = order.razorpay?.paymentId ? `| Payment: ${order.razorpay.paymentId}` : ''

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-7 w-full">
      <Tick className="text-green-600 !size-14" />
      <div className="text-center md:text-start">
        <p className="text-2xl">Your Order is confirmed</p>
        {shipping?.days && (
          <p className="text-gray-500 text-sm">Delivery: ~{shipping.days} business days</p>
        )}
        <p className="text-gray-500 text-sm">
          Order: #{order.id} {paymentIdText}
        </p>
      </div>
    </div>
  )
}
