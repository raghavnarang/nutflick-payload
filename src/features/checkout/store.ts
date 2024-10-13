import { create } from 'zustand'
import { Coupon } from '@/payload-types'

interface CheckoutStore {
  selectedCoupon?: Coupon
  setSelectedCoupon: (coupon?: Coupon) => void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  setSelectedCoupon: (coupon) =>
    set(() => ({
      selectedCoupon: coupon,
    })),
}))
