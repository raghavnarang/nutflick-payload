import "server-only";
import { createClient } from "@supabase/supabase-js";
import {
  getSecret,
  insertSecret,
  updateSecret,
} from "@/features/server/tokens";
import { SHIPROCKET_DB_TOKEN_KEY } from "./constants";
import { Database } from "../supabase/db-schema";

export const fetchTokenFromDB = (
  dbClient?: ReturnType<typeof createClient<Database>>
) => getSecret(SHIPROCKET_DB_TOKEN_KEY, dbClient);

export const insertTokenToDB = (
  token: string,
  dbClient?: ReturnType<typeof createClient<Database>>
) => insertSecret(SHIPROCKET_DB_TOKEN_KEY, token, dbClient);

export const updateTokenToDB = (
  token: string,
  dbClient?: ReturnType<typeof createClient<Database>>
) => updateSecret(SHIPROCKET_DB_TOKEN_KEY, token, dbClient);
