import { create } from 'zustand'
import { Coupon, ShippingOption } from '@/payload-types'

export enum GuestEmailMode {
  NEW,
  DEFAULT,
}

interface CheckoutStore {
  selectedCoupon?: Coupon
  selectedShipping?: ShippingOption['option'][0]
  setSelectedCoupon: (coupon?: Coupon) => void
  setSelectedShipping: (option?: ShippingOption['option'][0]) => void
  guestEmailMode: GuestEmailMode
  setGuestEmailMode: (mode: GuestEmailMode) => void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  guestEmailMode: GuestEmailMode.DEFAULT,
  setGuestEmailMode(mode) {
    set((state) => ({
      ...state,
      guestEmailMode: mode,
    }))
  },
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
