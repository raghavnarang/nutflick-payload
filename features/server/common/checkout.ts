import "server-only";
import { Database } from "@/lib/supabase/db-schema";
import { createServerClient } from "@supabase/ssr";
import { getCurrentUserCheckoutId } from "./user";

export const getCurrentUserCheckoutSubtotal = async (
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const checkoutId = await getCurrentUserCheckoutId(dbClient);
  const { data: items, error } = await dbClient
    .from("cart_product")
    .select("qty, variant:product_variant(price)")
    .eq("checkout_id", checkoutId);

  if (error) {
    console.log(error);
    throw new Error(
      "Unable to get current user's checkout to update Cart Product qty"
    );
  }

  const subtotal =
    !items || items.length === 0
      ? 0
      : items.reduce(
          (carry, item) => carry + item.qty * (item.variant?.price || 0),
          0
        );

  return {
    checkoutId,
    subtotal,
  };
};
