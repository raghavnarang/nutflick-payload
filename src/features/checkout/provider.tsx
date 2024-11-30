import type { ReactNode } from 'react'
import { CheckoutProviderClient } from './provider-client'

export async function CheckoutProvider({ children }: { children: ReactNode }) {
  //   const options = await getShippingOptions()
  //   const defaultShipping = options.length > 0 ? options[0] : undefined
  return (
    // <CheckoutProviderClient init={{ selectedShipping: defaultShipping }}>
    <CheckoutProviderClient>{children}</CheckoutProviderClient>
  )
}
