"use server";

import "server-only";
import type { Database } from "@/lib/supabase/db-schema";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/actions";
import { getCurrentUserCheckoutId } from "../common/user";

export const updateCartProductQty = async (
  variantId: number,
  qty: number,
  dbClient?: ReturnType<typeof createServerClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createClient(cookies());
  }

  const checkoutId = await getCurrentUserCheckoutId(dbClient);

  const { error: cartProductError } = await dbClient
    .from("cart_product")
    .update({ qty })
    .eq("checkout_id", checkoutId)
    .eq("variant_id", variantId);

  if (cartProductError) {
    console.log(cartProductError);
    throw new Error(
      "Unable to update current user's checkout's Cart Product qty"
    );
  }

  return checkoutId
};

export const deleteCartProduct = async (
  variantId: number,
  dbClient?: ReturnType<typeof createServerClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createClient(cookies());
  }

  const checkoutId = await getCurrentUserCheckoutId(dbClient);

  const { error: cartProductError } = await dbClient
    .from("cart_product")
    .delete()
    .eq("checkout_id", checkoutId)
    .eq("variant_id", variantId);

  if (cartProductError) {
    console.log(cartProductError);
    throw new Error(
      "Unable to delete current user's checkout's Cart Product"
    );
  }

  return checkoutId
};
