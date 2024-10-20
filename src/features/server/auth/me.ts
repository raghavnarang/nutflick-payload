'use server'

import 'server-only'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Payload } from 'payload'

export const getMeUser = async (
  payload: Payload,
  args?: {
    nullUserRedirect?: string
    validUserRedirect?: string
  },
) => {
  const { user } = await payload.auth({ headers: await headers() })

  const { nullUserRedirect, validUserRedirect } = args || {}
  if (validUserRedirect && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && !user) {
    redirect(nullUserRedirect)
  }

  return user
}
