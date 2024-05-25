import "server-only";

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
        `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!}:${process.env.RAZORPAY_KEY_SECRET!}`
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
    amount,
    currency: "INR",
  });

  if (response && response.id) {
    return response.id as string;
  }

  throw new Error(
    response?.error?.description || "Unable to create order with Razorpay API"
  );
};
