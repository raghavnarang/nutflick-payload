import { createClient as createStaticClient } from "@supabase/supabase-js";
import { Database } from "./db-schema";

export function createClient() {
  return createStaticClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}
