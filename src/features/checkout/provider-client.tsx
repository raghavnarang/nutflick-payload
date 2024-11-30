'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useRef } from 'react'
import { createCheckoutStore } from './store'
import type { CheckoutStore, CheckoutStoreData } from './store'
import { useStore } from 'zustand'

export type CheckoutStoreApi = ReturnType<typeof createCheckoutStore>

export const CheckoutStoreContext = createContext<CheckoutStoreApi | undefined>(undefined)

export const CheckoutProviderClient: FC<{ children: ReactNode; init?: CheckoutStoreData }> = ({
  children,
  init,
}) => {
  const storeRef = useRef<CheckoutStoreApi>(undefined)
  if (!storeRef.current) {
    storeRef.current = createCheckoutStore(init)
  }

  return (
    <CheckoutStoreContext.Provider value={storeRef.current}>
      {children}
    </CheckoutStoreContext.Provider>
  )
}

export const useCheckoutStore = <T,>(selector: (store: CheckoutStore) => T): T => {
  const checkoutStoreContext = useContext(CheckoutStoreContext)

  if (!checkoutStoreContext) {
    throw new Error(`useCheckoutStore must be used within CheckoutProvider`)
  }

  return useStore(checkoutStoreContext, selector)
}
