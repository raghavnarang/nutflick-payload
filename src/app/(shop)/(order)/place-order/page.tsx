import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'
import StartPayment from '@/components/place-order/start-payment'
import { getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import { getOrderStatus } from '@/features/razorpay/api'
import { redirect } from 'next/navigation'
import { RazorpayOrderStatus } from '@/features/razorpay/types/order'

export const metadata = {
  title: 'Transaction in Progress | Nutflick',
}

export default async function PlaceOrder() {
  const errorComponent = (
    <BigMessage icon={Error}>Something went wrong. Please try again later.</BigMessage>
  )

  const { customer } = await getCurrentGuestOrCustomer()
  if (!customer) {
    return errorComponent
  }

  const { pendingOrder: order } = customer
  if (
    typeof order === 'number' ||
    !order ||
    !order.razorpay ||
    !order.razorpay.orderId ||
    !order.razorpay.total
  ) {
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
