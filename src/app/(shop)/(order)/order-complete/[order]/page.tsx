import { getPayload } from 'payload'
import config from '@payload-config'
import OrderSummary from '@/components/order/order-summary'
import OrderStatus from '@/components/order/status'
import OrderCustomerSummary from '@/components/order/customer-summary'
import { getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import { Suspense } from 'react'
import OrderFetchingStatus from '@/components/order/status/fetching'
import FBPixelPurchase from './fb-pixel'

interface OrderCompleteArgs {
  params: Promise<{ order: number }>
}

export const metadata = {
  title: 'Order Confirmation | Nutflick',
}

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

  const subtotal = order.products.reduce((total, p) => total + p.qty * p.price, 0)
  const total = subtotal + (order.rate || 0) - (order.discount || 0)

  return (
    <div className="max-w-screen-sm mx-auto my-0">
      <Suspense fallback={<OrderFetchingStatus />}>
        <OrderStatus order={order} />
      </Suspense>
      <OrderCustomerSummary order={order} />
      <OrderSummary order={order} />
      <FBPixelPurchase
        products={order.products.map((p) => ({
          variantId: p.variantId,
          productId: (typeof p.productRef === 'number' ? p.productRef : p.productRef?.id) || 0,
          qty: p.qty,
        }))}
        total={total}
      />
    </div>
  )
}
