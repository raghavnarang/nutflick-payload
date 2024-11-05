'use server'

import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { ServerResponse } from '../utils'
import type { PayloadRequest } from 'payload'
import { registerExistingCustomer } from '../auth/register'
import { getMeUser } from '../auth/me'

export async function register(data: FormData) {
  const user = await getMeUser()
  if (user) {
    return ServerResponse('User is already logged in', 'error')
  }

  const { email, password, confirm } = zfd
    .formData({
      email: zfd.text(z.string().email()),
      password: zfd.text(),
      confirm: zfd.text(),
    })
    .parse(data)

  if (password != confirm) {
    return ServerResponse('Passwords are not same', 'error')
  }

  const payload = await getPayloadHMR({ config })
  const req = { transactionID: await payload.db.beginTransaction() } as PayloadRequest

  const { docs } = await payload.find({
    collection: 'customers',
    where: { email: { equals: email } },
    pagination: false,
    depth: 0,
  })

  const customer = docs.length > 0 ? docs[0] : null
  if (customer) {
    return registerExistingCustomer(customer, password, payload, req)
  }

  // If no customer, then create a registered customer
  await payload.create({
    collection: 'customers',
    data: { email: email, password: password },
    req,
  })

  // DB Operations Completed
  if (req?.transactionID) {
    await payload.db.commitTransaction(req.transactionID)
  }

  return ServerResponse('Please check your inbox for verification email', 'success')
}
