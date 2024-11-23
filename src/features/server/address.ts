import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Customer } from '@/payload-types'

export async function getPreferredOrFirstAddress(
  customer: Omit<Customer, 'updatedAt' | 'createdAt'>,
) {
  const payload = await getPayload({ config })
  const user = await payload.findByID({
    collection: 'customers',
    id: customer.id,
    overrideAccess: false,
    user: customer,
    depth: 1,
  })

  let address = user.preferredAddress
  if (typeof address === 'number') {
    address = await payload.findByID({
      collection: 'addresses',
      id: address,
      overrideAccess: false,
      user: customer,
      depth: 0,
    })
  }

  if (address) {
    return address
  }

  const { docs } = await payload.find({
    collection: 'addresses',
    where: { customer: { equals: customer.id } },
    limit: 1,
    overrideAccess: false,
    user: customer,
    depth: 0,
  })

  return docs.length > 0 ? docs[0] : null
}

export async function getAddressesByCustomerId(customerId: number) {
  const payload = await getPayload({ config })
  const { docs: addresses } = await payload.find({
    collection: 'addresses',
    where: { customer: { equals: customerId } },
    pagination: false,
  })

  return addresses
}
