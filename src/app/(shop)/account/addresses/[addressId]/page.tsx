import { redirectIfUnauthenticated } from '@/features/server/auth/me'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import MyAccountHeader from '../../header'
import MyAccountAddressForm from '../form'

export default async function UserEditAddressPage({
  params,
}: {
  params: Promise<{ addressId: number }>
}) {
  const { addressId } = await params
  const customer = await redirectIfUnauthenticated('/account/orders')
  if (!customer) {
    throw new Error('Customer data not available')
  }

  const payload = await getPayloadHMR({ config })
  const address = await payload.findByID({
    collection: 'addresses',
    id: addressId,
    overrideAccess: false,
    user: customer,
    depth: 0,
  })

  const preferredAddressId = customer.preferredAddress
    ? typeof customer.preferredAddress === 'number'
      ? customer.preferredAddress
      : customer.preferredAddress.id
    : undefined

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <MyAccountHeader
          title={`My Account / Addresses / #${addressId}`}
          email={customer.email}
          backLink="/account/addresses"
        />
        <MyAccountAddressForm address={address} isPreferred={preferredAddressId === address.id} />
      </div>
    </div>
  )
}
