import { Product } from '@/payload-types'
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

export function getProductRange(product: Product) {
  let lowPrice = product.variants?.[0].price || 0
  let lowVariantTitle = product.variants?.[0].title || ''
  let highPrice = 0
  let highVariantTitle = ''
  product.variants?.forEach((v) => {
    if (v.price < lowPrice) {
      lowPrice = v.price
      lowVariantTitle = v.title
    } else if (v.price > highPrice) {
      highPrice = v.price
      highVariantTitle = v.title
    }
  })

  return { lowPrice, highPrice, lowVariantTitle, highVariantTitle }
}
