import { redirectIfUnauthenticated } from '@/features/server/auth/me'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import MyAccountHeader from '../header'
import BigMessage from '@/components/big-message'
import Link from 'next/link'
import ChevronRight from '@/components/Icons/chevron-right'
import StatusPill, { StatusPillType } from '@/components/pill-status'
import MapPin from '@/components/Icons/map-pin'

export default async function UserAddressesPage() {
  const customer = await redirectIfUnauthenticated('/account/addresses')
  if (!customer) {
    throw new Error('Customer data not available')
  }

  const preferredAddressId = customer.preferredAddress
    ? typeof customer.preferredAddress === 'number'
      ? customer.preferredAddress
      : customer.preferredAddress.id
    : undefined

  const payload = await getPayloadHMR({ config })
  const { docs: addresses } = await payload.find({
    collection: 'addresses',
    pagination: false,
    overrideAccess: false,
    user: customer,
    depth: 0,
  })

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <MyAccountHeader
          title="My Account / Addresses"
          email={customer.email}
          backLink="/account"
          titleButton={{ link: '/account/addresses/add', text: 'Add New' }}
        />
        {addresses.length === 0 && (
          <BigMessage
            icon={MapPin}
            button={{ link: { href: '/account/addresses/add' }, text: 'Add New' }}
            secondaryButton={{ link: { href: '/' }, text: 'Go to Home' }}
          >
            No addresses found. Create a new one to use it for orders.
          </BigMessage>
        )}
        <div>
          {addresses.map((address) => (
            <Link
              key={address.id}
              href={`/account/addresses/${address.id}`}
              className="border-b py-5 flex justify-between items-center first:pt-0 last:pb-0 last:border-none"
            >
              <div>
                <p>
                  {address.name}{' '}
                  {preferredAddressId === address.id && (
                    <StatusPill type={StatusPillType.INFO} text="Preferred Address" />
                  )}
                </p>
                <p className="text-gray-500 text-sm">
                  {address.address}, {address.city}, {address.state}, {address.pincode}
                </p>
                <p className="text-gray-500 text-sm">Phone: {address.phone}</p>
              </div>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
