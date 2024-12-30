import CheckoutShippingClient from './client'
import { getShippingOptions } from '@/features/server/shipping'

const CheckoutShipping = async () => {
  const { option: options, freeShippingSettings } = await getShippingOptions()
  return options.length > 0 ? (
    <CheckoutShippingClient options={options} freeShippingSettings={freeShippingSettings} />
  ) : null
}

export default CheckoutShipping
