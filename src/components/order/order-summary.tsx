import { Order } from '@/payload-types'
import Section from '../section'
import SectionTitleValue from '../section/title-value'
import Price from '../product/price'
import SectionProduct from '../section/product'

const OrderSummary = ({ order }: { order: Order }) => {
  const subtotal = order.products.reduce((total, p) => total + p.qty * p.price, 0)
  const total = subtotal + (order.rate || 0) - (order.discount || 0)

  return (
    <Section title="Order Summary">
      {order.products.map((p) => (
        <SectionProduct {...p} />
      ))}
      {order.rate && (
        <SectionTitleValue title={`Shipping${order.mode ? ` (Mode: ${order.mode})` : ''}`}>
          <Price price={order.rate} />
        </SectionTitleValue>
      )}
      {order.discount && (
        <SectionTitleValue title={`Discount${order.coupon ? ` (${order.coupon})` : ''}`}>
          <Price price={order.discount} negative className="text-green-600 font-semibold" />
        </SectionTitleValue>
      )}
      <SectionTitleValue title="Total">
        <Price price={total} />
      </SectionTitleValue>
    </Section>
  )
}

export default OrderSummary
