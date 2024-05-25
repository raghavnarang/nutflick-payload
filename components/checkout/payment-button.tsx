"use client";

import { useCheckout } from "@/features/checkout";
import Button from "../button";
import Link from "next/link";

const CheckoutPaymentButton = () => {
  const { isLoading } = useCheckout();

  return (
    <Link href="/place-order" prefetch={false}>
      <Button disabled={isLoading} large>
        Place Order
      </Button>
    </Link>
  );
};

export default CheckoutPaymentButton;
