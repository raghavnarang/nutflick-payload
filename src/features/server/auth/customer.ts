'use server'

import 'server-only'
import { z } from 'zod'
import { getCookieExpiration, type BasePayload, type PayloadRequest } from 'payload'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { TokenSessionType } from '@/shared/types/token'
import type { Customer } from '@/payload-types'
import { generateRandomPassword } from './utils'

const emailSchema = z.string().email()
const passwordSchema = z.string().min(5)

const createCustomer = async (email: string, password?: string, req?: PayloadRequest) => {
  const parsedEmail = emailSchema.parse(email)
  const parsedPass = passwordSchema.optional().parse(password)

  const payload = await getPayloadHMR({ config })
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

export const getOrCreateCustomer = async (
  email: string,
  password?: string,
  req?: PayloadRequest,
) => {
  const parsedEmail = emailSchema.parse(email)
  const payload = await getPayloadHMR({ config })
  const { docs } = await payload.find({
    collection: 'customers',
    where: { email: { equals: parsedEmail } },
    pagination: false,
    req,
  })

  if (docs.length > 0) {
    return docs[0]
  }

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

const verifyUserToken = async () => {
  const payload = await getPayloadHMR({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get(`${payload.config.cookiePrefix}-token`)?.value
  if (!token) {
    return null
  }

  return jwt.verify(token, payload.secret)
}

export const getGuestPendingOrderTokenData = async () => {
  const userData = (await verifyUserToken()) as {
    type: TokenSessionType
    order: number
    id: number
    email: string
  }
  if (!userData || userData.type !== TokenSessionType.GUEST_PENDING_ORDER || !userData.order) {
    return null
  }

  return userData
}

export const getGuestTokenData = async () => {
  const userData = (await verifyUserToken()) as {
    id: number
    collection: 'customers'
    type: TokenSessionType
    order: number
    email: string
  }

  if (!userData || userData.type !== TokenSessionType.GUEST) {
    return null
  }

  return userData
}

export const createCustomerCookie = async (
  tokenData: any,
  payload: BasePayload,
  expiration?: number,
) => {
  const collectionConfig = payload.collections['customers'].config
  const authConfig = collectionConfig.auth

  const token = jwt.sign(tokenData, payload.secret, {
    expiresIn: expiration || authConfig.tokenExpiration,
  })
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

// Create GUEST token cookie
export async function createGuestCustomerCookie(
  user: { id: number; email: string },
  payload: BasePayload,
) {
  const tokenData = {
    id: user.id,
    collection: 'customers',
    email: user.email,
    type: TokenSessionType.GUEST,
  }

  // Expire after 1 week
  const expiration = 7 * 24 * 60 * 60

  await createCustomerCookie(tokenData, payload, expiration)
}

// Create GUEST_PENDING_ORDER token cookie
export async function createGuestpendingOrderCustomerCookie(
  user: Customer,
  orderId: number,
  payload: BasePayload,
) {
  const tokenData = {
    id: user.id,
    collection: 'customers',
    email: user.email,
    type: TokenSessionType.GUEST_PENDING_ORDER,
    order: orderId,
  }

  // Expire after 2 Hours
  const expiration = 2 * 60 * 60

  await createCustomerCookie(tokenData, payload, expiration)
}
