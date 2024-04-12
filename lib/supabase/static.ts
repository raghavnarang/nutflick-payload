import { createClient as createStaticClient } from "@supabase/supabase-js";
import { Database } from "./db-schema";

export function createClient() {
  return createStaticClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
