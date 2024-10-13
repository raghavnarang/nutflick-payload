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
  const jwtAuth = payload.authStrategies.find((s) => s.name === 'local-jwt')?.authenticate
  if (!jwtAuth) {
    return null
  }

  const { user } = await jwtAuth({ headers: await headers(), payload })

  const { nullUserRedirect, validUserRedirect } = args || {}
  if (validUserRedirect && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && !user) {
    redirect(nullUserRedirect)
  }

  return user
}
