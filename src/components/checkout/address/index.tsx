import Section from '@/components/section'
import { getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import { getAddressesByCustomerId, getPreferredOrFirstAddress } from '@/features/server/address'
import SectionBody from '@/components/section/body'
import CheckoutAddressClient from './client'
import type { Address } from '@/payload-types'

const CheckoutAddress = async () => {
  const { customer, isLoggedIn } = await getCurrentGuestOrCustomer()
  const address = (customer && (await getPreferredOrFirstAddress(customer))) || undefined

  const addresses: Address[] = []
  if (isLoggedIn && customer) {
    addresses.push(...(await getAddressesByCustomerId(customer.id)))
  }

  return (
    <Section title="Delivery Address">
      <SectionBody>
        <CheckoutAddressClient isLoggedIn={isLoggedIn} addresses={addresses} address={address} />
      </SectionBody>
    </Section>
  )
}

export default CheckoutAddress
