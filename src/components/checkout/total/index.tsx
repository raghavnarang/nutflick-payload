import { getShippingOptions } from '@/features/server/shipping'
import CheckoutTotalClient from './total'

export default async function CheckoutTotal() {
  const options = await getShippingOptions()
  const defaultShipping = options.length > 0 ? options[0] : undefined
  return <CheckoutTotalClient defaultShipping={defaultShipping} />
}
