import 'server-only'
import { z } from 'zod'
import { ServerResponse } from '../utils'
import type { BasePayload, PayloadRequest } from 'payload'
import { sendVerificationEmail } from './verification-email'
import { Customer } from '@/payload-types'

export async function registerExistingCustomer(
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
    showHiddenFields: true,
  })

  // DB Operations Completed
  if (req?.transactionID) {
    await payload.db.commitTransaction(req.transactionID)
  }

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
