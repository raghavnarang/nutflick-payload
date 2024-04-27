'use client'

import { useCart } from "@/features/cart";
import type { CartProduct } from "@/shared/types/cart";
import { useEffect, type FC } from "react";

const SyncProductsToLS: FC<{ items: CartProduct[] }> = ({ items }) => {
  const { setCartItems, clear } = useCart();
  useEffect(() => {
    if (items.length === 0) {
      clear();
    } else {
      setCartItems(items);
    }
  }, [items]);

  return null;
};

export default SyncProductsToLS;
