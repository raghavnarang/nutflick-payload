'use server'

import 'server-only'
import { ServerResponse } from '../utils'
import { placeGuestOrder, placeOrderSchema } from '../place-order'

export const placeOrder = async (data: FormData) => {
  const { data: checkout, success: parseSuccess } = placeOrderSchema.safeParse(data)
  if (!parseSuccess) {
    return ServerResponse('Invalid Data Provided', 'error')
  }

  // TODO: Currently implemented for Guest User, implement for Registered user as well.
  if (!checkout.email) {
    return ServerResponse('Email is missing', 'error')
  }

  // Place Guest Order
  return await placeGuestOrder({ ...checkout, email: checkout.email })
}
