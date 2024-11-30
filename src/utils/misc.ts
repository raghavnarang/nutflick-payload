import { CurrencyPosition } from '@/shared/types/currency'

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
