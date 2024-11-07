import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { z } from 'zod'
import { getCurrentGuestOrCustomer, getCustomerByEmail } from './auth/customer'
import { and, count, eq, lt, or } from 'drizzle-orm'
import { Coupon } from '@/payload-types'

export async function getCouponsForCustomer({
  email,
  forCheckout,
  coupon,
}:
  | {
      email?: string
      forCheckout?: boolean
      coupon?: string
    }
  | undefined = {}) {
  // console.log(email, forCheckout, coupon)
  let customerId = 0
  const { data: parsedEmail } = z.string().email().safeParse(email)

  // If customer is logged in OR is a guest user without any other's checkout email, then use that customer's id
  const { customer, isLoggedIn } = await getCurrentGuestOrCustomer()
  if (customer && customer.collection === 'customers' && (isLoggedIn || !parsedEmail)) {
    customerId = customer.id
  }

  // If not logged in & not guest (returning non-logged-in customer), but there is an email from checkout
  // Then use their customer's id, if available on backend
  if (!customerId && parsedEmail) {
    const guest = await getCustomerByEmail(parsedEmail)
    if (guest) {
      customerId = guest.id
    }
  }

  const payload = await getPayloadHMR({ config })
  const couponsDb = payload.db.tables['coupons']
  const ordersDb = payload.db.tables['orders']
  const db = payload.db.drizzle

  const whereArray = [eq(couponsDb.is_active, true)]
  const parsedForCheckout = z.boolean().optional().parse(forCheckout)
  if (parsedForCheckout) {
    whereArray.push(eq(couponsDb.checkout_visible, true))
  }

  const parsedCoupon = z.string().optional().parse(coupon)
  if (parsedCoupon) {
    whereArray.push(eq(couponsDb.coupon, parsedCoupon.toUpperCase()))
  }

  const where = whereArray.length > 1 ? and(...whereArray) : whereArray[0]
  const query = db
    .select({
      id: couponsDb.id,
      coupon: couponsDb.coupon,
      value: couponsDb.value,
      type: couponsDb.type,
      max_discount: couponsDb.max_discount,
      min_cart_value: couponsDb.min_cart_value,
    })
    .from(couponsDb)
    .where(where)

  if (customerId) {
    const joinColumns = and(eq(ordersDb.couponRef, couponsDb.id), eq(ordersDb.customer, customerId))

    query
      .leftJoin(ordersDb, joinColumns)
      .groupBy(couponsDb.id)
      .having(or(eq(couponsDb.is_infinite, '1'), lt(count(ordersDb.id), couponsDb.max_use)))
  }

  const coupons = await query
  return coupons as Coupon[]
}
