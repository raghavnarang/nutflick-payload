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
