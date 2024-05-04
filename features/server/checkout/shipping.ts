import type { Database } from "@/lib/supabase/db-schema";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/actions";
import { getCurrentUserCheckoutId } from "../common/user";
import { ShippingMode } from "@/shared/types/shipping";

export const updateShippingMode = async (
  mode: ShippingMode,
  dbClient?: ReturnType<typeof createServerClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createClient(cookies());
  }

  const checkoutId = await getCurrentUserCheckoutId(dbClient);

  const { error: checkoutErr } = await dbClient
    .from("checkout")
    .update({ shipping_mode: mode })
    .eq("id", checkoutId);

  if (checkoutErr) {
    console.log(checkoutErr);
    throw new Error("unable to update current user's shipping mode");
  }

  return checkoutId;
};
