"use client";

import { useCheckout } from "@/features/checkout";
import Button from "../button";
import { useRouter } from "next/navigation";

const CheckoutPaymentButton = () => {
  const { isLoading } = useCheckout();
  const router = useRouter();

  return (
    <Button
      disabled={isLoading}
      large
      onClick={() => router.push("/place-order")}
    >
      Place Order
    </Button>
  );
};

export default CheckoutPaymentButton;
