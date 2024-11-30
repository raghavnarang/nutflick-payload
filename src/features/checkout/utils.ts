import { Coupon, ShippingOption } from '@/payload-types'
import { useCartStore } from '../cart/cart-store/provider'

export const isCouponApplicable = (coupon?: Coupon | null, subtotal: number = 0) => {
  return coupon && (!coupon.min_cart_value || subtotal >= coupon.min_cart_value)
}

export const getDiscountValue = (coupon: Coupon, subtotal: number = 0) => {
  const discount = coupon.type === 'fixed' ? coupon.value : (coupon.value / 100) * subtotal
  return coupon.max_discount && coupon.max_discount <= discount ? coupon.max_discount : discount
}

export const getAdjustedShippingRate = (
  items: { includedShippingCost?: number | null; qty: number }[],
  rate: number,
) => {
  if (rate <= 0) {
    return 0
  }

  const adjustedRate = rate - getShippingCovered(items)
  return adjustedRate <= 0 ? 0 : adjustedRate
}

// This will return least applicable shipping rate according to total selected items weight
export const getApplicableShippingRate = (
  items: { includedShippingCost?: number | null; qty: number; weight: number }[],
  shippingOption: ShippingOption['option'][number],
) => {
  if (shippingOption.rates.length === 0) {
    throw new Error('Rates cannot be empty')
  }

  let totalWeight = items.reduce((carry, item) => carry + item.weight * item.qty, 0)
  let selectedRate = shippingOption.rates
    .sort((a, b) => a.weight - b.weight) // Sorting in ascending, as we want to get rate, whose weight is nearest to total weight
    .find((rate) => totalWeight < rate.weight) // Try to get rate whose weight is greater than total weight

  // If we get rate, whose weight > total weight, return selected rate
  if (selectedRate) {
    return selectedRate.rate
  }

  // else calculate correct rate according to greatest rate weight, as totalWeight is greater than all rates weights available
  selectedRate = shippingOption.rates[shippingOption.rates.length - 1]

  // Round off extra weight, by reducing to rounded off figure
  const extraWeight = totalWeight % selectedRate.weight
  totalWeight -= extraWeight

  // Note: Calculate shipping for one unit extra, as totalWeight is equal or exceeds the rate's weight
  totalWeight += selectedRate.weight
  return selectedRate.rate * (totalWeight / selectedRate.weight)
}

export const useCartSubtotal = () => {
  const cart = useCartStore((state) => state.cart)
  return cart.items.reduce((total, item) => total + item.price * item.qty, 0)
}

export const getShippingCovered = (
  items: { includedShippingCost?: number | null; qty: number }[],
) => {
  return items.reduce((total, item) => total + (item.includedShippingCost || 0) * item.qty, 0)
}
