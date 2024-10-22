import 'server-only'
import { NextRequest } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const { data: token, success } = z.string().safeParse(searchParams.get('token'))
  if (!success) {
    redirect(`/shop-error?message=Invalid verification link`)
  }

  const payload = await getPayloadHMR({ config })
  if (!(await payload.verifyEmail({ token, collection: 'customers' }))) {
    redirect(`/shop-error?message=Unable to verify`)
  }

  redirect(`/verify-done`)
}
