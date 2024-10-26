import CheckoutShippingClient from './client'
import { getShippingOptions } from '@/features/server/shipping'

const CheckoutShipping = async () => {
  const options = await getShippingOptions()
  return options.length > 0 ? <CheckoutShippingClient options={options} /> : null
}

export default CheckoutShipping
