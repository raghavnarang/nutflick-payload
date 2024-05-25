"use server";

import "server-only";
import { Status } from "@/shared/types/status";
import { createOrder as createRzpOrder } from "@/lib/razorpay/api";
import { createOrderForCurrentUser } from "../order";
import { insertOrder } from "@/lib/razorpay/db";
import { createClient } from "@/lib/supabase/service";
import { revalidatePath } from "next/cache";

export const initiateOrder = async () => {
  try {
    const dbClient = createClient();
    const order = await createOrderForCurrentUser(dbClient);
    const rzpOrderId = await createRzpOrder(order.total * 100);
    await insertOrder(order.id, rzpOrderId, dbClient);
    revalidatePath('/place-order')
    return {
      message: "Created Order",
      status: Status.success,
      order: { ...order, id: rzpOrderId },
    };
  } catch (e) {
    console.log(e);
    revalidatePath('/place-order')
    return {
      message: "Unable to create order",
      status: Status.error,
      order: undefined,
    };
  }
};
