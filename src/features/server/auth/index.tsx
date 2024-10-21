'use server'

import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { ServerResponse } from '../utils'
import type { BasePayload, PayloadRequest } from 'payload'
import { sendVerificationEmail } from './verification-email'
import { Customer } from '@/payload-types'

export async function register(data: FormData) {
  const { email, password, confirm } = zfd
    .formData({
      email: z.string(),
      password: z.string(),
      confirm: z.string(),
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

  return ServerResponse('Please check your inbox for verification email', 'success')
}

async function registerExistingCustomer(
  customer: Customer,
  password: string,
  payload: BasePayload,
  req?: PayloadRequest,
) {
  // if registered customer exists, then throw error that "customer already exists"
  if (customer._verified) {
    return ServerResponse(
      `Customer with ${customer.email} already exists! Try logging in.`,
      'error',
    )
  }

  const parsedPass = z.string().parse(password)

  // if not verified, then update password & send verification email
  const { email, _verificationToken } = await payload.update({
    collection: 'customers',
    data: { password: parsedPass },
    id: customer.id,
    req,
  })

  // If no verification token found, please debug
  if (!_verificationToken) {
    return ServerResponse(
      `Something is wrong at our end. We are working towards resolve it.`,
      'error',
    )
  }

  // Send verification email
  await sendVerificationEmail(email, _verificationToken, payload)
  return ServerResponse('Please check your inbox for verification email', 'success')
}
