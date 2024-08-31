import type { Product } from '@/payload-types'
import type { Cart, CartItem } from '@/shared/types/cart'
import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'
import { generateCartItem } from '../utils'

const defaultCart: Cart = { items: [], exp: 0 }

const CART_LOCAL_STORAGE_KEY = 'nc'
const CART_SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7

const prepareUpdatedCart = (items: CartItem[], cart: Cart) => {
  const newCart = { ...cart, items }
  return { cart: { ...newCart, exp: Date.now() + CART_SEVEN_DAYS } }
}

export interface CartStore {
  cart: Cart
  increment: (variantId: string, product?: Product) => void
  decrement: (variantId: string) => void
  setQty: (variantId: string, qty: number) => void
  clear: (product?: Product) => void
  clearVariant: (variantId: string) => void
  setCartItems: (items: CartItem[]) => void
}

export const createCartStore = (initState: Cart = defaultCart) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        cart: initState,
        increment: (variantId, product) => {
          let isCartUpdated = false
          const newCartItems = get().cart.items.map((ci) => {
            if (ci.variantId === variantId) {
              isCartUpdated = true
              return { ...ci, qty: ci.qty + 1 }
            }

            return ci
          })

          if (!isCartUpdated && product) {
            const item = generateCartItem(product, variantId)
            // Add new item
            if (item) {
              newCartItems.push(item)
            }
          }

          set((state) => prepareUpdatedCart(newCartItems, state.cart))
        },
        decrement: (variantId) => {
          let isItemUpdated = false
          let newCartItems = get().cart.items.map((ci) => {
            if (ci.variantId === variantId && ci.qty > 1) {
              isItemUpdated = true
              return { ...ci, qty: ci.qty - 1 }
            }

            return ci
          })

          if (!isItemUpdated) {
            // Remove existing item
            newCartItems = newCartItems.filter((ci) => ci.variantId !== variantId)
          }

          set((state) => prepareUpdatedCart(newCartItems, state.cart))
        },
        setQty: (variantId, qty) => {
          if (!qty) {
            return
          }

          const newCartItems = get().cart.items.map((ci) => {
            if (ci.variantId === variantId) {
              return { ...ci, qty }
            }

            return ci
          })

          set((state) => prepareUpdatedCart(newCartItems, state.cart))
        },
        clear: (product) => {
          const newCartItems = !product
            ? []
            : get().cart.items.filter(
                (ci) =>
                  ci.productId !== product.id ||
                  !product.variants?.find((v) => v.id === ci.variantId),
              )
          set((state) => prepareUpdatedCart(newCartItems, state.cart))
        },
        clearVariant: (variantId) => {
          const newCartItems = get().cart.items.filter((ci) => variantId !== ci.variantId)
          set((state) => prepareUpdatedCart(newCartItems, state.cart))
        },
        setCartItems: (items: CartItem[]) =>
          set((state) => prepareUpdatedCart([...items], state.cart)),
      }),
      {
        name: CART_LOCAL_STORAGE_KEY,
        onRehydrateStorage: () => (state) => {
          if (state && state.cart.exp > 0 && Date.now() >= state.cart.exp) {
            state.clear()
          }
        },
      },
    ),
  )
}
