"use client";

import LoadingAnimated from "@/components/Icons/loading-animated";
import BigMessage from "@/components/big-message";
import { useCart } from "@/features/cart";
import { validateCartAndGenerateCheckout } from "@/features/server/checkout";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const PreCheckoutPage = () => {
  const { cart, setCartItems } = useCart();
  const isExecuted = useRef(false);
  const router = useRouter();
  const { addToast } = useToast();
  useEffect(() => {
    const syncCart = async () => {
      if (isExecuted.current) {
        return;
      } else {
        isExecuted.current = true;
      }

      try {
        const { items, checkoutId } = await validateCartAndGenerateCheckout(
          cart.items.map((i) => ({ id: i.variantId, qty: i.qty }))
        );

        setCartItems(items);

        router.replace(`/checkout/${checkoutId}`);
      } catch (e) {
        addToast({
          id: Date.now(),
          message:
            "Something went wrong while generating checkout, Please try again",
          type: Status.error,
        });
        router.back();
      }
    };

    if (cart.items.length > 0) syncCart();
  }, []);

  return (
    <BigMessage icon={LoadingAnimated}>
      Generating your checkout. Please wait.
    </BigMessage>
  );
};

export default PreCheckoutPage;
