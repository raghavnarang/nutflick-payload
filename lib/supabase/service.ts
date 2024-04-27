import "server-only";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { Database } from "./db-schema";

export function createClient() {
  return createServiceClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}
