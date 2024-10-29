import { Order } from '@/payload-types'
import OrderStatusPill from './status/pill'
import Button from '../button'
import Link from 'next/link'

export default function AfterOrderSummary({ order }: { order: Order }) {
  return (
    <div className="grid md:grid-cols-2 mb-6 gap-6">
      <div className="bg-gray-50 px-5 py-4 rounded">
        <p className="mb-2">Order Status</p>
        <OrderStatusPill order={order} />
      </div>
      <div className="bg-gray-50 px-5 py-4 rounded">
        <p className="mb-2">Tracking link</p>
        {order.afterOrder?.trackLink ? (
          <Link href={order.afterOrder.trackLink} target="_blank">
            <Button small type="button">
              Click here to track
            </Button>
          </Link>
        ) : (
          <p className="text-gray-500">No tracking link available</p>
        )}
      </div>
    </div>
  )
}
