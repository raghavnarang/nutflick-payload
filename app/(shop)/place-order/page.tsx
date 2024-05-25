"use client";

import { Error } from "@/components/Icons";
import LoadingAnimated from "@/components/Icons/loading-animated";
import BigMessage from "@/components/big-message";
import { useCart } from "@/features/cart";
import { initiateOrder } from "@/features/server/actions/order";
import { Status } from "@/shared/types/status";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

const PlaceOrder = () => {
  const { data, isError, mutate, isPending } = useMutation({
    mutationFn: () => {
      return initiateOrder();
    },
  });

  const { clear } = useCart();
  const isOnSuccessExecuted = useRef(false);
  const isMutationExecuted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMutationExecuted.current) {
      return;
    }

    setTimeout(() => {
      mutate();
    }, 100);

    return () => {
      isMutationExecuted.current = true;
    };
  }, []);

  useEffect(() => {
    if (isOnSuccessExecuted.current) {
      return;
    }
    if (data && data.status === Status.success && data.order) {
      clear();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.order.total * 100,
        currency: "INR",
        order_id: data.order.id,
        callback_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/after-payment`,
        image:
          "https://xghbfedvknsyjypohzpv.supabase.co/storage/v1/object/public/public_bucket/logo_square.png?t=2024-05-25T09%3A53%3A42.975Z",
        name: "Nutflick",
        prefill: {
          name: data.order.name,
          contact: data.order.phone,
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

      return () => {
        isOnSuccessExecuted.current = true;
      };
    }
  }, [data]);

  if (isError || (data && data.status === Status.error)) {
    return (
      <BigMessage
        icon={Error}
        button={{ text: "Go to home", onClick: () => router.replace("/") }}
      >
        Something went wrong while placing your order.
      </BigMessage>
    );
  }

  return (
    <>
      <BigMessage icon={LoadingAnimated}>
        Do not press back or close browser. Transaction is in progress.
      </BigMessage>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};

export default PlaceOrder;
