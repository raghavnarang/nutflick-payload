import 'server-only'
import { NextRequest } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { createExpiredCookie, getCurrentGuestOrCustomer } from '@/features/server/auth/customer'
import { z } from 'zod'

const UrlPathnameSchema = z
  .string()
  .optional()
  .refine((pathname) => {
    // Customize the logic to match your requirements
    const pathnameRegex = /^(\/([a-zA-Z0-9\_\-\/]+)?)+$/
    return !pathname || pathnameRegex.test(pathname)
  })

export async function GET(request: NextRequest) {
  const { customer, isLoggedIn } = await getCurrentGuestOrCustomer()
  if (!customer || !isLoggedIn) {
    redirect(`/shop-error?message=No logged in user found`)
  }

  const payload = await getPayloadHMR({ config })
  await createExpiredCookie(payload)

  const searchParams = request.nextUrl.searchParams
  const ref = UrlPathnameSchema.parse(searchParams.get('ref') || '')
  redirect(`/login${ref ? `/ref=${ref}` : ''}`)
}
