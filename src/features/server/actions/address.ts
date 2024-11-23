'use server'

import 'server-only'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import states from '@/features/states.json'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { PayloadRequest } from 'payload'
import { getMeUser } from '../auth/me'
import { ServerResponse } from '../utils'
import { redirect } from 'next/navigation'

const statesArray = Object.keys(states)

const addressFormSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  phone: zfd
    .numeric(z.number().min(6000000000).max(9999999999))
    .transform((val) => val?.toString()),
  address: zfd.text(),
  pincode: zfd.numeric(z.number().max(999999)).transform((val) => val?.toString()),
  city: zfd.text(),
  state: zfd
    .text(z.enum([statesArray[0], ...statesArray]))
    .transform((val) => val as keyof typeof states),
  is_preferred: zfd.checkbox(),
})

export async function addAddress(formData: FormData) {
  const customer = await getMeUser()
  if (!customer) {
    return ServerResponse('Unable to find loggedin user', 'error')
  }

  const { is_preferred: isPreferred, ...address } = addressFormSchema.parse(formData)

  const payload = await getPayload({ config })
  const transactionID = await payload.db.beginTransaction()
  const req = { transactionID: transactionID || undefined } as PayloadRequest

  const newAddress = await payload.create({
    collection: 'addresses',
    data: { ...address, customer: customer.id },
    overrideAccess: false,
    user: customer,
    req,
  })

  if (isPreferred) {
    await payload.update({
      collection: 'customers',
      data: { preferredAddress: newAddress.id },
      id: customer.id,
      req,
    })
  }

  // DB Operations Completed
  if (req.transactionID) {
    await payload.db.commitTransaction(req.transactionID)
  }

  redirect(`/account/addresses/${newAddress.id}?added=true`)
}

export async function editAddress(formData: FormData) {
  const customer = await getMeUser()
  if (!customer || customer.collection !== 'customers') {
    return ServerResponse('Unable to find loggedin user', 'error')
  }

  const { is_preferred: isPreferred, id, ...address } = addressFormSchema.parse(formData)
  if (!id) {
    return ServerResponse('Unable to find address to be edited', 'error')
  }

  const payload = await getPayload({ config })
  const transactionID = await payload.db.beginTransaction()
  const req = { transactionID: transactionID || undefined } as PayloadRequest

  await payload.update({
    collection: 'addresses',
    data: { ...address },
    id,
    overrideAccess: false,
    user: customer,
    req,
  })

  const preferredAddressId = customer.preferredAddress
    ? typeof customer.preferredAddress === 'number'
      ? customer.preferredAddress
      : customer.preferredAddress.id
    : undefined

  if ((preferredAddressId !== id && isPreferred) || (preferredAddressId === id && !isPreferred)) {
    await payload.update({
      collection: 'customers',
      data: { preferredAddress: isPreferred ? id : null },
      id: customer.id,
      req,
    })
  }

  // DB Operations Completed
  if (req.transactionID) {
    await payload.db.commitTransaction(req.transactionID)
  }

  return ServerResponse('Address edited successfully', 'success')
}

export async function deleteAddress(id: number) {
  const customer = await getMeUser()
  if (!customer || customer.collection !== 'customers') {
    return ServerResponse('Unable to find loggedin user', 'error')
  }

  const parsedId = z.number().parse(id)

  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'addresses',
    id: parsedId,
    overrideAccess: false,
    user: customer,
  })

  redirect(`/account/addresses?deleted=true`)
}
