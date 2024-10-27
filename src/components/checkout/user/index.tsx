import { getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import CheckoutUserClient from './client'
import Section from '@/components/section'
import SectionBody from '@/components/section/body'

export default async function CheckoutUser() {
  const { customer, isLoggedIn } = await getCurrentGuestOrCustomer()

  return (
    <Section title="Email">
      <SectionBody>
        <CheckoutUserClient email={customer?.email} isLoggedIn={isLoggedIn} />
      </SectionBody>
    </Section>
  )
}
