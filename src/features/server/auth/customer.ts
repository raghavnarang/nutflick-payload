'use server'

import 'server-only'
import { z } from 'zod'
import type { PayloadRequest } from 'payload'
import { generateRandomPassword } from './utils'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

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

export const getOrCreateCustomer = async (email: string, password?: string, req?: PayloadRequest) => {
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
