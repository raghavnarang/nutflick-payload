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
  let lowPrice = product.variants?.[0]?.price || 0
  let lowVariantTitleByPrice = product.variants?.[0]?.title || ''
  let highPrice = 0
  let highVariantTitleByPrice = ''
  let lowWeight = product.variants?.[0]?.weight || 0
  let highWeight = 0
  let lowVariantTitleByWeight = product.variants?.[0]?.title || ''
  let highVariantTitleByWeight = ''

  product.variants?.forEach((v) => {
    if (v.price < lowPrice) {
      lowPrice = v.price
      lowVariantTitleByPrice = v.title
    } else if (v.price > highPrice) {
      highPrice = v.price
      highVariantTitleByPrice = v.title
    }

    if (v.weight < lowWeight) {
      lowWeight = v.weight
      lowVariantTitleByWeight = v.title
    } else if (v.weight > highWeight) {
      highWeight = v.weight
      highVariantTitleByWeight = v.title
    }
  })

  return {
    lowPrice,
    highPrice,
    lowVariantTitle: { byPrice: lowVariantTitleByPrice, byWeight: lowVariantTitleByWeight },
    highVariantTitle: { byPrice: highVariantTitleByPrice, byWeight: highVariantTitleByWeight },
    lowWeight,
    highWeight,
  }
}
