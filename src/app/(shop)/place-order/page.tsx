import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { cookies } from 'next/headers'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'
import jwt from 'jsonwebtoken'
import { TokenSessionType } from '@/shared/types/token'
import StartPayment from '@/components/place-order/start-payment'

export default async function PlaceOrder() {
  const payload = await getPayloadHMR({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get(`${payload.config.cookiePrefix}-token`)?.value
  const errorComponent = (
    <BigMessage icon={Error}>Something went wrong. Please try again later.</BigMessage>
  )
  if (!token) {
    return errorComponent
  }

  const userData = jwt.verify(token, payload.secret) as { type: TokenSessionType; order: number }
  if (!userData || userData.type !== TokenSessionType.GUEST_PENDING_ORDER || !userData.order) {
    // TODO: Implement other session type other than GUEST_PENDING_ORDER
    return errorComponent
  }

  const order = await payload.findByID({ collection: 'orders', id: userData.order })
  if (!order || !order.razorpay || !order.razorpay.orderId || !order.razorpay.total) {
    return errorComponent
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
