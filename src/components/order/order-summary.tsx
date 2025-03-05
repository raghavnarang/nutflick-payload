import { Order } from '@/payload-types'
import Section from '../section'
import SectionTitleValue from '../section/title-value'
import Price from '../product/price'
import SectionProduct from '../section/product'

const OrderSummary = ({ order, gstInvoice }: { order: Order; gstInvoice?: boolean }) => {
  const subtotal = order.products.reduce((total, p) => total + p.qty * p.price, 0)
  const total = subtotal + (order.rate || 0) - (order.discount || 0)
  const isIGST = order.state !== order.gstState

  return (
    <Section title="Order Summary">
      {order.products.map((p) => (
        <SectionProduct
          {...p}
          key={p.id}
          orderSubtotal={subtotal}
          orderDiscount={order.discount || 0}
          isIGST={isIGST}
          gstRate={p.gstRate || 0}
          gstInvoice={gstInvoice}
        />
      ))}
      {order.rate ? (
        <SectionTitleValue title={`Shipping${order.mode ? ` (Mode: ${order.mode})` : ''}`}>
          <Price price={order.rate} />
        </SectionTitleValue>
      ) : null}
      {!gstInvoice && order.discount ? (
        <SectionTitleValue title={`Discount${order.coupon ? ` (${order.coupon})` : ''}`}>
          <Price price={order.discount} negative className="text-green-600 font-semibold" />
        </SectionTitleValue>
      ) : null}
      <SectionTitleValue title="Total">
        <div className="flex flex-col items-end">
          <Price price={total} className="font-medium" />
          {gstInvoice && <span className="text-xs">(Inclusive of GST & Discount)</span>}
        </div>
      </SectionTitleValue>
    </Section>
  )
}

export default OrderSummary
