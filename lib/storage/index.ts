import "server-only";

import { createClient as createStaticClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { Database } from "../supabase/db-schema";

export const uploadFile = async (
  file: File,
  name: string,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const { data, error } = await dbClient.storage
    .from(process.env.SUPABASE_PUBLIC_BUCKET!)
    .upload(name + "." + file.name.split(".")[1], file, { upsert: true });

  if (error) {
    throw error;
  }

  return data.path;
};

export const getPublicUrlFromPath = async (
  path: string,
  dbClient: ReturnType<
    typeof createServerClient<Database> | typeof createStaticClient<Database>
  >
) => {
  const { data } = await dbClient.storage
    .from(process.env.SUPABASE_PUBLIC_BUCKET!)
    .getPublicUrl(path);

  return data.publicUrl;
};
