import { getMeUser } from '@/features/server/auth/me'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getPaymentStatus } from '@/features/razorpay/api'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'
import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'
import OrderSummary from '@/components/order/order-summary'
import { ShippingOption } from '@/payload-types'
import OrderStatus from '@/components/order/status'
import OrderCustomerSummary from '@/components/order/customer-summary'
import { getGuestTokenData } from '@/features/server/auth/customer'

interface OrderCompleteArgs {
  params: Promise<{ order: number }>
}

const ErrorComponent = ({ message }: { message?: string }) => (
  <BigMessage icon={Error}>{message || 'Something went wrong. Please try again later.'}</BigMessage>
)

export default async function OrderComplete({ params: paramsPromise }: OrderCompleteArgs) {
  const { order: orderId } = await paramsPromise
  const payload = await getPayloadHMR({ config })
  const guest = await getGuestTokenData()
  const order = await payload.findByID({
    collection: 'orders',
    id: orderId,
    overrideAccess: false,
    user: guest,
    depth: 0,
  })

  if (!order.razorpay?.orderId || !order.razorpay.paymentId) {
    return <ErrorComponent message="No valid payment data found for order" />
  }

  const status = await getPaymentStatus(order.razorpay.paymentId)
  if (status === RazorpayPaymentStatus.CREATED) {
    return (
      <ErrorComponent
        message={`The payment for current order is invalid: ${order.razorpay.paymentId}`}
      />
    )
  }

  let shipping: ShippingOption['option'][0] | undefined = undefined
  if (order.rate && order.mode) {
    const options = await payload.findGlobal({ slug: 'shipping-options' })
    shipping = options.option.find((o) => o.mode === order.mode)
  }

  return (
    <div className="max-w-screen-sm mx-auto my-0">
      <OrderStatus order={order} status={status} shipping={shipping} />
      <OrderCustomerSummary order={order} />
      <OrderSummary order={order} />
    </div>
  )
}
