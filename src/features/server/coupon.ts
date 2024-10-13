'use server'

import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getMeUser } from './auth/me'
import { z } from 'zod'

export const getCheckoutCoupons = async () => {
  const payload = await getPayloadHMR({ config })
  const user = await getMeUser(payload)
  const { docs: coupons } = await payload.find({
    collection: 'coupons',
    pagination: false,
    overrideAccess: false,
    user,
  })

  return coupons.filter((c) => c.checkout_visible)
}

export const getApplicableCoupon = async (coupon: string) => {
  const couponParsed = z.string().parse(coupon).toUpperCase();

  const payload = await getPayloadHMR({ config })
  const user = await getMeUser(payload)
  const { docs: coupons } = await payload.find({
    collection: 'coupons',
    where: { coupon: { equals: couponParsed } },
    pagination: false,
    overrideAccess: false,
    user,
  })

  return coupons.length > 0 ? coupons[0] : null
}
