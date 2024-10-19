import { Order } from '@/payload-types'

export default function OrderCustomerSummary({ order }: { order: Order }) {
  return (
    <div className="grid md:grid-cols-2 mb-6 gap-6">
      <div className="bg-gray-50 px-5 py-4 rounded">
        <p className="mb-2">Ship To</p>
        <p className="text-gray-500">
          {order.name}
          <br />
          {order.address}, {order.city}, {order.state}, {order.pincode}
        </p>
      </div>
      <div className="bg-gray-50 px-5 py-4 rounded">
        <p className="mb-2">Phone</p>
        <p className="text-gray-500">{order.phone}</p>
      </div>
    </div>
  )
}
