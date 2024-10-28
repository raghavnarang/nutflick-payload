import { redirectIfUnauthenticated } from '@/features/server/auth/me'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import MyAccountHeader from '../../header'
import BigMessage from '@/components/big-message'
import { Cart } from '@/components/Icons'
import Link from 'next/link'
import ChevronRight from '@/components/Icons/chevron-right'
import OrderStatus from '@/components/order/status'
import OrderCustomerSummary from '@/components/order/customer-summary'
import OrderSummary from '@/components/order/order-summary'
import OrderFetchingStatus from '@/components/order/status/fetching'
import OrderUnknownStatus from '@/components/order/status/unknown'
import { Suspense } from 'react'

export default async function UserSingleOrderPage({
  params,
}: {
  params: Promise<{ orderId: number }>
}) {
  const { orderId } = await params
  const customer = await redirectIfUnauthenticated('/account/orders')
  if (!customer) {
    throw new Error('Customer data not available')
  }

  const payload = await getPayloadHMR({ config })
  const order = await payload.findByID({
    collection: 'orders',
    id: orderId,
    overrideAccess: false,
    user: customer,
    depth: 0,
  })

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <MyAccountHeader
          title={`My Account / Orders / #${orderId}`}
          email={customer.email}
          backLink="/account/orders"
        />
        <div className="max-w-screen-sm mx-auto my-0">
          <Suspense fallback={<OrderFetchingStatus />}>
            <OrderStatus order={order} />
          </Suspense>
          <OrderCustomerSummary order={order} />
          <OrderSummary order={order} />
        </div>
      </div>
    </div>
  )
}
