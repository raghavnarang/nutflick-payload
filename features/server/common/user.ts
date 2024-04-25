import "server-only";
import { Database } from "@/lib/supabase/db-schema";
import { createServerClient } from "@supabase/ssr";

export const getCurrentUserId = async (
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const { data: userData, error: userError } = await dbClient.auth.getUser();
  if (userError || !userData) {
    console.log(userError);
    throw Error("Unable to get current user");
  }

  return userData.user.id;
};

export const getCurrentUserCheckoutId = async (
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const userId = await getCurrentUserId(dbClient);
  const { data: checkout, error } = await dbClient
    .from("checkout")
    .select("id")
    .eq("user_id", userId);

  if (error || !checkout || checkout.length === 0) {
    console.log(error);
    throw new Error(
      "Unable to get current user's checkout to update Cart Product qty"
    );
  }

  return checkout[0].id;
};
