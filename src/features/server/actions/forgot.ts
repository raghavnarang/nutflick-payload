'use server'

import 'server-only'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { ServerResponse } from '../utils'
import { getCurrentGuestOrCustomer } from '../auth/customer'

export async function forgotPassword(data: FormData) {
  const { isLoggedIn } = await getCurrentGuestOrCustomer()
  if (isLoggedIn) {
    return ServerResponse('User is already logged in', 'error')
  }

  const { email } = zfd.formData({ email: zfd.text(z.string().email()) }).parse(data)

  const payload = await getPayloadHMR({ config })
  await payload.forgotPassword({ collection: 'customers', data: { email } })

  return ServerResponse('Please check your inbox for reset password email', 'success')
}

export async function resetPassword(data: FormData) {
  const { isLoggedIn } = await getCurrentGuestOrCustomer()
  if (isLoggedIn) {
    return ServerResponse('User is already logged in', 'error')
  }

  const { password, confirm, token } = zfd
    .formData({ password: zfd.text(), confirm: zfd.text(), token: zfd.text() })
    .parse(data)

  if (password != confirm) {
    return ServerResponse('Passwords are not same', 'error')
  }

  const payload = await getPayloadHMR({ config })
  try {
    await payload.resetPassword({
      collection: 'customers',
      data: { token, password },
      overrideAccess: true,
    })
  } catch (e: any) {
    return ServerResponse(e.message, 'error')
  }

  return ServerResponse('Password changed successfully', 'success')
}
