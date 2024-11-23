import 'server-only'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'
import { redirect, RedirectType } from 'next/navigation'
import { getCurrentGuestOrCustomer } from './customer'

export const getMeUser = cache(async () => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  return user
})

export const redirectIfUnauthenticated = async (ref?: string) => {
  const { customer, isLoggedIn } = await getCurrentGuestOrCustomer()
  if (!isLoggedIn) {
    redirect(`/login${ref ? `?ref=${ref}` : ''}`, RedirectType.replace)
  }

  return customer
}

export const redirectIfAuthenticated = async (ref?: string) => {
  const { isLoggedIn } = await getCurrentGuestOrCustomer()
  if (isLoggedIn) {
    redirect(ref || '/account', RedirectType.replace)
  }
}
