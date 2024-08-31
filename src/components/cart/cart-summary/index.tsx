"use client";

import Price from "@/components/product/price";
import type { Cart } from "@/shared/types/cart";
import type { FC } from "react";
import Button from "@/components/button";
import Section from "@/components/section";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  cart: Cart;
}

const CartSummary: FC<CartSummaryProps> = ({ cart }) => {
  const total = cart.items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const router = useRouter();

  return (
    <div className="lg:w-1/3 w-full">
      <Section title="Cart Summary">
        <div className="md:px-8 px-4 h-16 flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <Price price={total} />
        </div>
      </Section>
      <Button large onClick={() => router.push("/checkout")}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
