import { Tick } from '@/components/Icons'
import type { Order, ShippingOption } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export default async function OrderConfirmedStatus({ order }: { order: Order }) {
  const paymentIdText = order.razorpay?.paymentId ? `| Payment: ${order.razorpay.paymentId}` : ''

  const payload = await getPayloadHMR({ config })
  let shipping: ShippingOption['option'][0] | undefined = undefined
  if (order.rate && order.mode) {
    const options = await payload.findGlobal({ slug: 'shipping-options' })
    shipping = options.option.find((o) => o.mode === order.mode)
  }

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
