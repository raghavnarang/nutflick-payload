import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'
import StartPayment from '@/components/place-order/start-payment'
import { getGuestPendingOrderTokenData } from '@/features/server/auth/customer'
import { getOrderStatus } from '@/features/razorpay/api'
import { redirect } from 'next/navigation'
import { RazorpayOrderStatus } from '@/features/razorpay/types/order'

export default async function PlaceOrder() {
  const errorComponent = (
    <BigMessage icon={Error}>Something went wrong. Please try again later.</BigMessage>
  )

  const userData = await getGuestPendingOrderTokenData()
  if (!userData) {
    return errorComponent
  }

  const payload = await getPayloadHMR({ config })
  const order = await payload.findByID({
    collection: 'orders',
    id: userData.order,
    overrideAccess: false,
    user: { ...userData }
  })
  if (!order || !order.razorpay || !order.razorpay.orderId || !order.razorpay.total) {
    return errorComponent
  }

  // Check if this is a paid order
  const orderStatus = await getOrderStatus(order.razorpay.orderId)
  if (orderStatus === RazorpayOrderStatus.PAID) {
    redirect('/verify-payment')
  }

  return (
    <StartPayment
      total={order.razorpay.total}
      rzpOrderId={order.razorpay.orderId}
      name={order.name}
      phone={order.phone}
    />
  )
}
