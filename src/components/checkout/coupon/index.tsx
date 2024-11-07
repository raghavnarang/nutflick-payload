import { getCouponsForCustomer } from '@/features/server/coupon'
import CheckoutCouponsClient from './client'

const CheckoutCoupons = async () => {
  const coupons = await getCouponsForCustomer({ forCheckout: true })
  return <CheckoutCouponsClient coupons={coupons} />
}

export default CheckoutCoupons
