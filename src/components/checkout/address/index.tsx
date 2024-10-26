import Section from '@/components/section'
import { getGuestTokenData } from '@/features/server/auth/customer'
import { getPreferredOrFirstAddress } from '@/features/server/address'
import SectionBody from '@/components/section/body'
import CheckoutAddressClient from './client'
import { getMeUser } from '@/features/server/auth/me'

const CheckoutAddress = async () => {
  const customer = await getMeUser()
  let address = (customer && (await getPreferredOrFirstAddress(customer))) || undefined

  if (!address) {
    const guest = await getGuestTokenData()
    address = (guest && (await getPreferredOrFirstAddress(guest))) || undefined
  }

  return (
    <Section title="Delivery Address">
      <SectionBody>
        <CheckoutAddressClient address={address} isLoggedIn={!!customer} />
      </SectionBody>
    </Section>
  )
}

export default CheckoutAddress
