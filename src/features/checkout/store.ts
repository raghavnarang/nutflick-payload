import { create, createStore } from 'zustand'
import { Coupon, ShippingOption } from '@/payload-types'

export enum GuestEmailMode {
  NEW,
  DEFAULT,
}

export interface CheckoutStoreData {
  selectedCoupon?: Coupon
  selectedShipping?: ShippingOption['option'][0]
  guestEmailMode?: GuestEmailMode
  guestEmail?: string
}

export interface CheckoutStore extends CheckoutStoreData {
  setSelectedCoupon: (coupon?: Coupon) => void
  setSelectedShipping: (option?: ShippingOption['option'][0]) => void
  setGuestEmailMode: (mode: GuestEmailMode) => void
  setGuestEmail: (email: string) => void
  reset: () => void
}

export const createCheckoutStore = (init?: CheckoutStoreData) => {
  return createStore<CheckoutStore>()((set) => ({
    ...init,
    guestEmailMode: GuestEmailMode.DEFAULT,
    setGuestEmailMode(mode) {
      set((state) => ({
        ...state,
        guestEmailMode: mode,
        guestEmail: '',
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
    guestEmail: '',
    setGuestEmail: (email) => set((state) => ({ ...state, guestEmail: email })),
    reset: () =>
      set({
        guestEmailMode: GuestEmailMode.DEFAULT,
        selectedCoupon: undefined,
        selectedShipping: undefined,
        guestEmail: '',
      }),
  }))
}
