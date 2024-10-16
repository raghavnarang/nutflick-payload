import { create } from 'zustand'
import { Coupon, ShippingOption } from '@/payload-types'

interface CheckoutStore {
  selectedCoupon?: Coupon
  selectedShipping?: ShippingOption['option'][0]
  setSelectedCoupon: (coupon?: Coupon) => void
  setSelectedShipping: (option?: ShippingOption['option'][0]) => void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  setSelectedShipping(option) {
    set((state) => ({
      ...state,
      selectedShipping: option,
    }))
  },
  setSelectedCoupon: (coupon) =>
    set((state) => ({
      ...state,
      selectedCoupon: coupon,
    })),
}))
