import { redirectIfUnauthenticated } from '@/features/server/auth/me'
import { getPayload } from 'payload'
import config from '@payload-config'
import MyAccountHeader from '../header'
import BigMessage from '@/components/big-message'
import { Cart } from '@/components/Icons'
import Link from 'next/link'
import ChevronRight from '@/components/Icons/chevron-right'
import OrderStatusPill from '@/components/order/status/pill'

export default async function UserOrdersPage() {
  const customer = await redirectIfUnauthenticated('/account/orders')
  if (!customer) {
    throw new Error('Customer data not available')
  }

  const payload = await getPayload({ config })
  const { docs: orders } = await payload.find({
    collection: 'orders',
    pagination: false,
    overrideAccess: false,
    user: customer,
    depth: 0,
  })

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <MyAccountHeader title="My Account / Orders" email={customer.email} backLink="/account" />
        {orders.length === 0 && (
          <BigMessage icon={Cart} button={{ link: { href: '/' }, text: 'Go to Home' }}>
            No orders found. Lets create some. Go to home, and shop now
          </BigMessage>
        )}
        <div>
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="border-b py-5 flex justify-between items-center first:pt-0 last:pb-0 last:border-none"
            >
              <div>
                <div>
                  <p className="inline-block mr-3">
                    <span className="text-gray-500">#{order.id} | </span>
                    {order.products
                      .map((p) => `${p.title}${p.qty > 1 ? ` (x${p.qty})` : ''}`)
                      .join(', ')}
                  </p>
                  <OrderStatusPill order={order} />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.updatedAt).toLocaleDateString('en-US', {
                    weekday: 'long', // "Monday"
                    year: 'numeric', // "2024"
                    month: 'long', // "October"
                    day: 'numeric', // "29"
                    hour: 'numeric', // "5 PM"
                    minute: '2-digit', // "05"
                  })}
                </p>
              </div>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
