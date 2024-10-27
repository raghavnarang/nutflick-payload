'use server'

import 'server-only'
import { ServerResponse } from '../utils'
import { placeOrder as placeCustomerOrder, placeOrderSchema } from '../place-order'
import { getCurrentGuestOrCustomer } from '../auth/customer'

export const placeOrder = async (data: FormData) => {
  const { data: checkout, success: parseSuccess } = placeOrderSchema.safeParse(data)
  if (!parseSuccess) {
    return ServerResponse('Invalid Data Provided', 'error')
  }

  const { customer, isLoggedIn } = await getCurrentGuestOrCustomer()
  const email = isLoggedIn ? customer?.email : checkout.email
  if (!email) {
    return ServerResponse('Email is missing', 'error')
  }

  // Place Order
  return await placeCustomerOrder({ ...checkout, email, isLoggedIn })
}
