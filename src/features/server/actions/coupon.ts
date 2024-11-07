'use server'

import 'server-only'

import { getCouponsForCustomer } from '../coupon'

export const getApplicableCoupon = async (coupon: string, email?: string) => {
  const coupons = await getCouponsForCustomer({ email, coupon })

  return coupons.length > 0 ? coupons[0] : null
}
