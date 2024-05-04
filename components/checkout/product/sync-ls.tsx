'use client'

import { useCart } from "@/features/cart";
import { useCheckout } from "@/features/checkout";
import type { CartProduct } from "@/shared/types/cart";
import { useEffect, type FC } from "react";

const SyncProductsToLS: FC<{ items: CartProduct[] }> = ({ items }) => {
  const { setCartItems, clear } = useCart();
  const {setLoading} = useCheckout();
  useEffect(() => {
    if (items.length === 0) {
      clear();
    } else {
      setCartItems(items);
    }
    setLoading(false)
  }, [items]);

  return null;
};

export default SyncProductsToLS;
