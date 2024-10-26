import { getCheckoutCoupons } from '@/features/server/coupon'
import CheckoutCouponsClient from './client'

const CheckoutCoupons = async () => {
  const coupons = await getCheckoutCoupons()
  return <CheckoutCouponsClient coupons={coupons} />
}

export default CheckoutCoupons
