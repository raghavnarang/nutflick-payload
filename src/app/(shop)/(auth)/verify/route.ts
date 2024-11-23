import 'server-only'
import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const { data: token, success } = z.string().safeParse(searchParams.get('token'))
  if (!success) {
    redirect(`/shop-error?message=Invalid verification link`)
  }

  const payload = await getPayload({ config })
  if (!(await payload.verifyEmail({ token, collection: 'customers' }))) {
    redirect(`/shop-error?message=Unable to verify`)
  }

  redirect(`/verify-done`)
}
