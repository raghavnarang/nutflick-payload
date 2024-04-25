"use client";

import type { Cart, CartProduct } from "@/shared/types/cart";
import type {
  ProductGridItem,
  ProductVariantGridItem,
} from "@/shared/types/product";
import type { FC, ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getCartProduct } from "./utils";

const defaultCart: Cart = { items: [], exp: 0 };
const defaultIncrementFn = (
  variant: ProductVariantGridItem | number,
  product?: ProductGridItem
) => {};

const CartContext = createContext({
  cart: defaultCart,
  increment: defaultIncrementFn,
  decrement: (variantId: number) => {},
  clear: (variantId?: number) => {},
  setCartItems: (items: CartProduct[]) => {},
  setQty: (variantId: number, qty: number) => {},
});

const CART_LOCAL_STORAGE_KEY = "nc";
const CART_SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    const cartJson = window.localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    if (cartJson) {
      const cartLS = JSON.parse(cartJson) as Cart;

      if (Date.now() >= cartLS.exp) {
        clear();
      } else {
        setCart(cartLS);
      }
    }
  }, []);

  const increment = (
    variant: ProductVariantGridItem | number,
    product?: ProductGridItem
  ) => {
    let isItemUpdated = false;
    const variantId = typeof variant === "number" ? variant : variant.id;
    const newCartItems = cart.items.map((ci) => {
      if (ci.variantId === variantId) {
        isItemUpdated = true;
        return { ...ci, qty: ci.qty + 1 };
      }

      return ci;
    });

    if (!isItemUpdated && product && typeof variant !== "number") {
      // Add new item
      newCartItems.push(getCartProduct(product, variant));
    }

    setCartItems(newCartItems);
  };

  const decrement = (variantId: number) => {
    let isItemUpdated = false;
    let newCartItems = cart.items.map((ci) => {
      if (ci.variantId === variantId && ci.qty > 1) {
        isItemUpdated = true;
        return { ...ci, qty: ci.qty - 1 };
      }

      return ci;
    });

    if (!isItemUpdated) {
      // Add new item
      newCartItems = newCartItems.filter((ci) => ci.variantId !== variantId);
    }

    setCartItems(newCartItems);
  };

  const setQty = (variantId: number, qty: number) => {
    if(!qty) {
      return;
    }

    const newCartItems = cart.items.map((ci) => {
      if (ci.variantId === variantId) {
        return { ...ci, qty };
      }

      return ci;
    });

    setCartItems(newCartItems);
  }

  const clear = (variantId?: number) =>
    setCartItems(
      !variantId ? [] : cart.items.filter((ci) => ci.variantId !== variantId)
    );

  const setCartItems = (items: CartProduct[]) => {
    const newCart = { ...cart, items };
    window.localStorage.setItem(
      CART_LOCAL_STORAGE_KEY,
      JSON.stringify(newCart)
    );
    setCart({ ...newCart, exp: Date.now() + CART_SEVEN_DAYS });
  };

  return (
    <CartContext.Provider
      value={{ cart, increment, decrement, clear, setCartItems, setQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
