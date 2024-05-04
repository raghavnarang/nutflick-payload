"use client";

import type { FC, ReactNode } from "react";
import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext({
  isLoading: false,
  setLoading: (val: boolean) => {},
  total: 0,
  setShipping: (amt: number) => {},
});

interface CheckoutProviderProps {
  subtotal: number;
  children: ReactNode;
  defaultLoading?: boolean;
}

export const CheckoutProvider: FC<CheckoutProviderProps> = ({
  subtotal,
  children,
  defaultLoading = false,
}) => {
  const [isLoading, setLoading] = useState(defaultLoading);
  const [shipping, setShipping] = useState(0);

  const total = subtotal + shipping;

  return (
    <CheckoutContext.Provider
      value={{ isLoading, setLoading, total, setShipping }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
