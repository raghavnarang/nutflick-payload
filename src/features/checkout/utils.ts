import { Coupon } from '@/payload-types'
import { useCartStore } from '../cart/cart-store/provider'

export const isCouponApplicable = (coupon?: Coupon | null, subtotal: number = 0) => {
  return coupon && (!coupon.min_cart_value || subtotal >= coupon.min_cart_value)
}

export const getDiscountValue = (coupon: Coupon, subtotal: number = 0) => {
  const discount = coupon.type === 'fixed' ? coupon.value : (coupon.value / 100) * subtotal
  return coupon.max_discount && coupon.max_discount <= discount ? coupon.max_discount : discount
}

export const useCartSubtotal = () => {
  const cart = useCartStore((state) => state.cart)
  return cart.items.reduce((total, item) => total + item.price * item.qty, 0)
}
