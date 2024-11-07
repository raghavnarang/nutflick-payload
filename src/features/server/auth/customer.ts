import 'server-only'
import { z } from 'zod'
import { getCookieExpiration, type BasePayload, type PayloadRequest } from 'payload'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { generateRandomPassword } from './utils'
import { cache } from 'react'
import { getMeUser } from './me'

const emailSchema = z.string().email()
const passwordSchema = z.string().min(5)

export async function getCustomerByEmail(email: string) {
  const parsedEmail = emailSchema.parse(email)
  const payload = await getPayloadHMR({ config })
  const { docs } = await payload.find({
    collection: 'customers',
    where: { email: { equals: parsedEmail } },
    pagination: false,
  })

  return docs.length > 0 ? docs[0] : null
}

export const getOrCreateCustomer = async (
  email: string,
  password?: string,
  req?: PayloadRequest,
) => {
  const customer = await getCustomerByEmail(email)
  if (customer) {
    return customer
  }

  const payload = await getPayloadHMR({ config })
  const parsedEmail = emailSchema.parse(email)
  const parsedPass = passwordSchema.optional().parse(password)
  return payload.create({
    req,
    collection: 'customers',
    data: {
      email: parsedEmail,
      password: parsedPass || (await generateRandomPassword()),
    },
    disableVerificationEmail: true,
  })
}

const verifyUserToken = cache(async () => {
  const payload = await getPayloadHMR({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get(`${payload.config.cookiePrefix}-token`)?.value
  if (!token) {
    return null
  }

  return jwt.verify(token, payload.secret)
})

export const getCurrentGuestOrCustomer = cache(async () => {
  const guest = await getTokenData()
  if (guest?.isGuest && guest.collection === 'customers') {
    const payload = await getPayloadHMR({ config })
    const customer = await payload.findByID({
      collection: 'customers',
      id: guest.id,
      depth: 1,
      overrideAccess: false,
      user: guest,
    })

    return {
      customer: { ...customer, collection: 'customers' },
      isLoggedIn: false,
    }
  }

  const customer = await getMeUser()
  if (customer && customer.collection === 'customers') {
    return {
      customer,
      isLoggedIn: true,
    }
  }

  return {
    customer: null,
    isLoggedIn: false,
  }
})

const getTokenData = async () => {
  return (await verifyUserToken()) as {
    id: number
    collection: 'customers'
    isGuest: boolean
    email: string
  } | null
}

const signCustomerToken = (tokenData: any, payload: BasePayload, expiration: number) => {
  return jwt.sign(tokenData, payload.secret, {
    expiresIn: expiration,
  })
}

export const createCustomerCookie = async (
  token: string,
  payload: BasePayload,
  expiration?: number,
) => {
  const collectionConfig = payload.collections['customers'].config
  const authConfig = collectionConfig.auth
  const cookieStore = await cookies()

  const sameSite =
    typeof authConfig.cookies.sameSite === 'string'
      ? authConfig.cookies.sameSite.toLowerCase()
      : authConfig.cookies.sameSite
        ? 'strict'
        : undefined

  cookieStore.set(`${payload.config.cookiePrefix}-token`, token, {
    expires: getCookieExpiration({ seconds: expiration || authConfig.tokenExpiration }),
    httpOnly: true,
    path: '/',
    sameSite: sameSite as any,
    secure: authConfig.cookies.secure,
  })
}

export const createExpiredCookie = async (payload: BasePayload) => {
  const collectionConfig = payload.collections['customers'].config
  const authConfig = collectionConfig.auth
  const cookieStore = await cookies()

  const sameSite =
    typeof authConfig.cookies.sameSite === 'string'
      ? authConfig.cookies.sameSite.toLowerCase()
      : authConfig.cookies.sameSite
        ? 'strict'
        : undefined

  const expires = new Date(Date.now() - 1000)

  cookieStore.set(`${payload.config.cookiePrefix}-token`, '', {
    expires,
    httpOnly: true,
    path: '/',
    sameSite: sameSite as any,
    secure: authConfig.cookies.secure,
  })
}

// Create GUEST token cookie
export async function createGuestCustomerCookie(
  user: { id: number; email: string },
  payload: BasePayload,
) {
  const tokenData = {
    id: user.id,
    collection: 'customers',
    email: user.email,
    isGuest: true,
  }

  // Expire after 1 week
  const expiration = 7 * 24 * 60 * 60

  // Create signed token
  const token = signCustomerToken(tokenData, payload, expiration)

  // Set Cookie
  await createCustomerCookie(token, payload, expiration)
}
