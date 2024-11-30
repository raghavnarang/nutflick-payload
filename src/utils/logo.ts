// @ts-ignore
import logo from '@/public/logo.png'

export function getLogo() {
  return logo
}

export function getLogoURL() {
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL!
  return baseURL + getLogo().src
}
