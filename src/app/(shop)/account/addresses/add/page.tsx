import MyAccountHeader from '../../header'
import { redirectIfUnauthenticated } from '@/features/server/auth/me'
import MyAccountAddressForm from '../form'

export const metadata = {
  title: 'Add New Address | Nutflick',
}

export default async function UserAddAddressPage() {
  const customer = await redirectIfUnauthenticated('/account/orders')
  if (!customer) {
    throw new Error('Customer data not available')
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <MyAccountHeader
          title="My Account / Addresses / Add New"
          email={customer.email}
          backLink="/account/addresses"
        />
        <MyAccountAddressForm />
      </div>
    </div>
  )
}
