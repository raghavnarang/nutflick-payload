import { getGuestTokenData } from '@/features/server/auth/customer'
import CheckoutUserClient from './client'
import Section from '@/components/section'
import SectionBody from '@/components/section/body'
import { getMeUser } from '@/features/server/auth/me'

export default async function CheckoutUser() {
  const customer = await getMeUser()
  let email = customer?.email
  if (!email) {
    const guest = await getGuestTokenData()
    email = guest?.email
  }

  return (
    <Section title="Email">
      <SectionBody>
        <CheckoutUserClient email={email} isLoggedIn={!!customer} />
      </SectionBody>
    </Section>
  )
}
