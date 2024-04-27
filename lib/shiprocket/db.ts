import "server-only";
import { createClient } from "../supabase/service";
import { fetchToken } from "./api";
import {
  getSecret,
  insertSecret,
  updateSecret,
} from "@/features/server/tokens";
import { SHIPROCKET_TOKEN } from "./constants";

export const getToken = () => getSecret(SHIPROCKET_TOKEN);

export const fetchAndStoreToken = async () => {
  const token = await fetchToken();

  const dbClient = createClient();
  const dbToken = await getSecret(SHIPROCKET_TOKEN, dbClient);
  if (!dbToken) {
    await insertSecret(SHIPROCKET_TOKEN, token, dbClient);
  } else {
    await updateSecret(SHIPROCKET_TOKEN, token, dbClient);
  }
};
