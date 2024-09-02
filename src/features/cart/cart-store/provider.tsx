'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'
import { CartStore, createCartStore } from './store'
import { useStore } from 'zustand'
import { syncCartItems } from '@/features/server/product'

export type CartStoreApi = ReturnType<typeof createCartStore>

export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined)

/** Sync Cart Items from server on App Load */
const useSyncCartItems = (store: CartStoreApi) => {
  const { isHydrated, setCartItems, cart } = useStore(store, (state) => state)
  useEffect(() => {
    const syncCart = async () => {
      if (isHydrated && cart.items.length > 0) {
        const syncedItems = await syncCartItems(cart.items)
        setCartItems(syncedItems)
      }
    }

    syncCart()
  }, [isHydrated])
}

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<CartStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createCartStore()
  }

  useSyncCartItems(storeRef.current)

  return <CartStoreContext.Provider value={storeRef.current}>{children}</CartStoreContext.Provider>
}

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext)

  if (!cartStoreContext) {
    throw new Error(`useCartStore must be used within CounterStoreProvider`)
  }

  return useStore(cartStoreContext, selector)
}
