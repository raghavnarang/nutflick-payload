import { getGuestTokenData } from '@/features/server/auth/customer'
import CheckoutClient from './client'

const CheckoutPage = async () => {
  const guest = await getGuestTokenData()

  return <CheckoutClient email={guest?.email} />
}

export default CheckoutPage
