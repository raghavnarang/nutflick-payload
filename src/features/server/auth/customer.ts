'use server'

import 'server-only'
import { z } from 'zod'
import { getCookieExpiration, type BasePayload, type PayloadRequest } from 'payload'
import { generateRandomPassword } from './utils'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { TokenSessionType } from '@/shared/types/token'

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
      password: parsedPass || generateRandomPassword(),
    },
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
      password: parsedPass || generateRandomPassword(),
    },
  })
}

export const getGuestPendingOrderTokenData = async () => {
  const payload = await getPayloadHMR({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get(`${payload.config.cookiePrefix}-token`)?.value
  if (!token) {
    return null
  }

  const userData = jwt.verify(token, payload.secret) as {
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

export const createCustomerCookie = async (tokenData: any, payload: BasePayload) => {
  const collectionConfig = payload.collections['customers'].config
  const authConfig = collectionConfig.auth

  const token = jwt.sign(tokenData, payload.secret, { expiresIn: authConfig.tokenExpiration })
  const cookieStore = await cookies()

  const sameSite =
    typeof authConfig.cookies.sameSite === 'string'
      ? authConfig.cookies.sameSite.toLowerCase()
      : authConfig.cookies.sameSite
        ? 'strict'
        : undefined

  cookieStore.set(`${payload.config.cookiePrefix}-token`, token, {
    expires: getCookieExpiration({ seconds: authConfig.tokenExpiration }),
    httpOnly: true,
    path: '/',
    sameSite: sameSite as any,
    secure: authConfig.cookies.secure,
  })
}
