import { getPayload } from 'payload'
import config from '@payload-config'
import { getPaymentStatus } from '@/features/razorpay/api'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'
import { RazorpayPaymentStatus } from '@/features/razorpay/types/payment'
import OrderSummary from '@/components/order/order-summary'
import { ShippingOption } from '@/payload-types'
import OrderStatus from '@/components/order/status'
import OrderCustomerSummary from '@/components/order/customer-summary'
import { getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import { Suspense } from 'react'
import OrderFetchingStatus from '@/components/order/status/fetching'

interface OrderCompleteArgs {
  params: Promise<{ order: number }>
}

const ErrorComponent = ({ message }: { message?: string }) => (
  <BigMessage icon={Error}>{message || 'Something went wrong. Please try again later.'}</BigMessage>
)

export default async function OrderComplete({ params: paramsPromise }: OrderCompleteArgs) {
  const { order: orderId } = await paramsPromise
  const payload = await getPayload({ config })
  const { customer } = await getCurrentGuestOrCustomer()
  const order = await payload.findByID({
    collection: 'orders',
    id: orderId,
    overrideAccess: false,
    user: customer,
    depth: 0,
  })

  return (
    <div className="max-w-screen-sm mx-auto my-0">
      <Suspense fallback={<OrderFetchingStatus />}>
        <OrderStatus order={order} />
      </Suspense>
      <OrderCustomerSummary order={order} />
      <OrderSummary order={order} />
    </div>
  )
}
