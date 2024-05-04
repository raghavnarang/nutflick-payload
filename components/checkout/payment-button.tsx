'use client'

import { useCheckout } from "@/features/checkout";
import Button from "../button";

const CheckoutPaymentButton = () => {
  const { isLoading } = useCheckout();

  return (
    <Button disabled={isLoading} large type="submit">
      Proceed to Payment
    </Button>
  );
};

export default CheckoutPaymentButton;
