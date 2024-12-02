// @ts-ignore
import logo from '@/public/logo.png'

export function getLogo() {
  return logo
}

export function getLogoURL(local?: boolean) {
  if (!local && process.env.NEXT_PUBLIC_LOGO_URL) return process.env.NEXT_PUBLIC_LOGO_URL

  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL!
  return baseURL + getLogo().src
}
