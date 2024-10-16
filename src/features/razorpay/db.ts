"use server";

import "server-only";
import { createServerClient } from "@supabase/ssr";
import { Database } from "../supabase/db-schema";

export const insertOrder = async (
  orderId: number,
  rzpOrderId: string,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const { error } = await dbClient
    .from("razorpay_orders")
    .insert({ order_id: orderId, rzp_order_id: rzpOrderId })
    .select("id");

  if (error) {
    console.log(error);
    throw Error("Unable to insert razorpay order");
  }
};
