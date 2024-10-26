import 'server-only'
import { headers } from 'next/headers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const getMeUser = cache(async () => {
  const payload = await getPayloadHMR({ config })
  const { user } = await payload.auth({ headers: await headers() })

  return user
})

export const redirectIfUnauthenticated = async (ref?: string) => {
  const user = await getMeUser()
  if (!user) {
    redirect(`/login${ref ? `?ref=${ref}` : ''}`)
  }
}

export const redirectIfAuthenticated = async (ref?: string) => {
  const user = await getMeUser()
  if (user) {
    redirect(ref || '/account')
  }
}
