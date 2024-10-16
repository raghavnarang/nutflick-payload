import { Coupon } from '@/payload-types'
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
  const adjustedRate =
    rate - items.reduce((total, item) => total + (item.includedShippingCost || 0) * item.qty, 0)

  return adjustedRate <= 0 ? 0 : adjustedRate
}

export const useCartSubtotal = () => {
  const cart = useCartStore((state) => state.cart)
  return cart.items.reduce((total, item) => total + item.price * item.qty, 0)
}

export const useGetShippingCovered = () => {
  const cart = useCartStore((state) => state.cart)
  return cart.items.reduce((total, item) => total + (item.shippingCovered || 0) * item.qty, 0)
}
