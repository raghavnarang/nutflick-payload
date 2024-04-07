import "server-only";

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export const uploadFile = async (file: File, name: string) => {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_PUBLIC_BUCKET!)
    .upload(name + "." + file.name.split(".")[1], file, { upsert: true });

  if (error) {
    throw error;
  }

  return data.path;
};

export const getPublicUrlFromPath = async (path: string) => {
  const supabase = createClient(cookies());
  const { data } = await supabase.storage
    .from(process.env.SUPABASE_PUBLIC_BUCKET!).getPublicUrl(path)

  return data.publicUrl;
};
