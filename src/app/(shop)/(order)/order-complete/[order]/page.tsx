import { getMeUser } from '@/features/server/auth/me'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getOrderStatus, getPaymentStatus } from '@/features/razorpay/api'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'
import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'

interface OrderCompleteArgs {
  params: Promise<{ order: number }>
}

const ErrorComponent = ({ message }: { message?: string }) => (
  <BigMessage icon={Error}>{message || 'Something went wrong. Please try again later.'}</BigMessage>
)

export default async function OrderComplete({ params: paramsPromise }: OrderCompleteArgs) {
  const { order: orderId } = await paramsPromise
  const payload = await getPayloadHMR({ config })
  const user = await getMeUser(payload)
  const order = await payload.findByID({
    collection: 'orders',
    id: orderId,
    overrideAccess: false,
    user,
    depth: 0,
  })

  // TODO: Add Order table with this message as well
  if (!order.razorpay?.orderId || !order.razorpay.paymentId) {
    return <ErrorComponent message="No valid payment data found for order" />
  }

  // TODO: Make views for CAPTURED, AUTHORISED, and rest statuses
  const status = await getPaymentStatus(order.razorpay.paymentId)
  if(status !== RazorpayPaymentStatus.CAPTURED) {

  }

  return <p>Order Complete: {orderId}</p>
}
