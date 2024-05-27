import "server-only";
import { RazorpayOrderStatus } from "./types/order";
import { RazorpayPaymentStatus } from "./types/payment";

export const rzpFetch = async (
  url: string,
  data?: any,
  method?: "GET" | "POST"
) => {
  const finalMethod = method || (data ? "POST" : "GET");
  const response = await fetch(url, {
    method: finalMethod,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(
        `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!}:${process.env
          .RAZORPAY_KEY_SECRET!}`
      )}`,
    },
    ...(finalMethod === "POST" && {
      body: JSON.stringify(data),
    }),
  });

  return response.json();
};

export const createOrder = async (amount: number) => {
  const response = await rzpFetch("https://api.razorpay.com/v1/orders", {
    amount: amount * 100,
    currency: "INR",
  });

  if (response && response.id) {
    return response.id as string;
  }

  throw new Error(
    response?.error?.description || "Unable to create order with Razorpay API"
  );
};

export const getOrderStatus = async (id: string) => {
  const response = await rzpFetch(`https://api.razorpay.com/v1/orders/${id}`);

  if (response && response.id && response.status) {
    return response.status as RazorpayOrderStatus;
  }

  throw new Error(
    response?.error?.description ||
      "Unable to get order status with Razorpay API"
  );
};

export const getPaymentStatus = async (id: string) => {
  const response = await rzpFetch(`https://api.razorpay.com/v1/payments/${id}`);

  if (response && response.id && response.status) {
    return response.status as RazorpayPaymentStatus;
  }

  throw new Error(
    response?.error?.description ||
      "Unable to get payment status with Razorpay API"
  );
};

export const capturePayment = async (id: string, amount: number) => {
  const response = await rzpFetch(
    `https://api.razorpay.com/v1/payments/${id}/capture`,
    { amount: amount * 100, currency: "INR" }
  );

  if (
    response &&
    response.id &&
    response.status === RazorpayPaymentStatus.CAPTURED
  ) {
    return true;
  }

  throw new Error(
    response?.error?.description ||
      "Unable to capture payment with Razorpay API"
  );
};
