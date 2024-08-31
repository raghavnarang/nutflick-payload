'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useRef } from 'react'
import { CartStore, createCartStore } from './store'
import { useStore } from 'zustand'

export type CartStoreApi = ReturnType<typeof createCartStore>

export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined)

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<CartStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createCartStore()
  }

  return <CartStoreContext.Provider value={storeRef.current}>{children}</CartStoreContext.Provider>
}

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext)

  if (!cartStoreContext) {
    throw new Error(`useCartStore must be used within CounterStoreProvider`)
  }

  return useStore(cartStoreContext, selector)
}
