'use client'

import { useCartSubtotal } from '@/features/checkout/utils'
import Price from '../product/price'
import SectionTitleValue from '../section/title-value'

export default function CheckoutSubtotal() {
  const subtotal = useCartSubtotal()

  return (
    <SectionTitleValue title="Subtotal">
      <Price price={subtotal} />
    </SectionTitleValue>
  )
}
