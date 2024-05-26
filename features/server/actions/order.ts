"use server";

import "server-only";
import { Status } from "@/shared/types/status";
import { createOrder as createRzpOrder } from "@/lib/razorpay/api";
import { createOrderForCurrentUser } from "../order";
import { insertOrder } from "@/lib/razorpay/db";
import { createClient } from "@/lib/supabase/service";

export const initiateOrder = async () => {
  try {
    const dbClient = createClient();
    const order = await createOrderForCurrentUser(dbClient);
    const rzpOrderId = await createRzpOrder(order.total);
    await insertOrder(order.id, rzpOrderId, dbClient);
    
    return {
      message: "Created Order",
      status: Status.success,
      order: { ...order, rzpOrderId },
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Unable to create order",
      status: Status.error,
      order: undefined,
    };
  }
};
