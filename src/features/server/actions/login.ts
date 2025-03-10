'use server'

import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { createCustomerCookie, getCurrentGuestOrCustomer } from '../auth/customer'
import { ServerResponse } from '../utils'
import { redirect, RedirectType } from 'next/navigation'

const UrlPathnameSchema = z
  .string()
  .refine((pathname) => {
    // Customize the logic to match your requirements
    const pathnameRegex = /^(\/([a-zA-Z0-9\_\-\/]+)?)+$/
    return pathnameRegex.test(pathname)
  })
  .optional()

export default async function login(data: FormData) {
  const { isLoggedIn } = await getCurrentGuestOrCustomer()
  if (isLoggedIn) {
    return ServerResponse('User is already logged in', 'error')
  }

  const { email, password, ref } = zfd
    .formData({
      email: zfd.text(z.string().email()),
      password: zfd.text(),
      ref: zfd.text(UrlPathnameSchema),
    })
    .parse(data)

  const payload = await getPayload({ config })

  let token: string | undefined = undefined
  try {
    const result = await payload.login({ data: { email, password }, collection: 'customers' })
    token = result.token
  } catch (e) {}

  if (!token) {
    return ServerResponse('Unable to login. Please check credentials', 'error')
  }

  await createCustomerCookie(token, payload)
  redirect(ref || '/account', RedirectType.replace)
}
