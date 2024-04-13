"use client";

import type { Cart } from "@/shared/types/cart";
import type {
  ProductGridItem,
  ProductVariantGridItem,
} from "@/shared/types/product";
import type { FC, ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getCartProduct } from "./utils";

const defaultCart: Cart = { items: [] };
const defaultIncrementFn = (
  variant: ProductVariantGridItem | number,
  product?: ProductGridItem
) => {};
const defaultDecrementFn = (variantId: number) => {};

const CartContext = createContext({
  cart: defaultCart,
  increment: defaultIncrementFn,
  decrement: defaultDecrementFn,
  clear: (variantId?: number) => {},
});

const CART_LOCAL_STORAGE_KEY = "nutflick_cart";

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    const cartJson = window.localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    if (cartJson) setCart(JSON.parse(cartJson) as Cart);
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

    const newCart = { ...cart, items: newCartItems };
    window.localStorage.setItem(
      CART_LOCAL_STORAGE_KEY,
      JSON.stringify(newCart)
    );
    setCart(newCart);
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

    const newCart = { ...cart, items: newCartItems };
    window.localStorage.setItem(
      CART_LOCAL_STORAGE_KEY,
      JSON.stringify(newCart)
    );
    setCart(newCart);
  };

  const clear = (variantId?: number) => {
    const newCart = {
      ...cart,
      items: !variantId
        ? []
        : cart.items.filter((ci) => ci.variantId !== variantId),
    };

    window.localStorage.setItem(
      CART_LOCAL_STORAGE_KEY,
      JSON.stringify(newCart)
    );
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, increment, decrement, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
