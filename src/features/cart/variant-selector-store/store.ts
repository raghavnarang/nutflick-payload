import type { Product } from '@/payload-types'
import { create } from 'zustand'

export interface CartVariantSelectorStore {
  product?: Product
  setProduct: (product?: Product) => void
}

export const useCartVariantSelectorStore = create<CartVariantSelectorStore>()((set) => ({
  setProduct: (product) => {
    set(() => ({ product }))
  },
}))
