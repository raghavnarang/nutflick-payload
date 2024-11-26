import { CurrencyPosition } from '@/shared/types/currency'
import logo from '@/public/logo.png'

export function hasDecimal(num: number): boolean {
  return num % 1 !== 0
}

export function getFormattedPrice(
  price: number,
  negative = false,
  currency = '₹',
  currencyPosition = CurrencyPosition.Left,
) {
  return `${negative ? '- ' : ''}${currencyPosition === CurrencyPosition.Left ? currency : ''}${
    hasDecimal(price) ? price.toFixed(2) : price
  }${currencyPosition === CurrencyPosition.Right ? currency : ''}`
}

export function getLogo() {
  return logo
}

export function getLogoURL() {
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL!
  return baseURL + getLogo().src
}
