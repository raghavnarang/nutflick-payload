import "server-only";
import type { Database } from "../../../lib/supabase/db-schema";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServiceClient } from "@/lib/supabase/service";

export const getSecret = async (
  name: string,
  dbClient?: ReturnType<typeof createClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createServiceClient();
  }

  const { data, error } = await dbClient
    .from("tokens")
    .select("secret")
    .eq("name", name);

  if (error) {
    throw error;
  }

  return data?.[0]?.secret;
};

export const insertSecret = async (
  name: string,
  secret: string,
  dbClient?: ReturnType<typeof createClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createServiceClient();
  }

  const { error } = await dbClient.from("tokens").insert({ name, secret });
  if (error) {
    throw error;
  }
};

export const updateSecret = async (
  name: string,
  secret: string,
  dbClient?: ReturnType<typeof createClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createServiceClient();
  }

  const { error } = await dbClient
    .from("tokens")
    .update({ secret })
    .eq("name", name);
  if (error) {
    throw error;
  }
};
