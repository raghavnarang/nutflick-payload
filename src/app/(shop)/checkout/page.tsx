import { getGuestTokenData } from '@/features/server/auth/customer'
import CheckoutClient from './client'
import { getPreferredOrFirstAddress } from '@/features/server/address'

const CheckoutPage = async () => {
  const guest = await getGuestTokenData()
  const address = (guest && (await getPreferredOrFirstAddress(guest))) || undefined

  return <CheckoutClient email={guest?.email} address={address} />
}

export default CheckoutPage
