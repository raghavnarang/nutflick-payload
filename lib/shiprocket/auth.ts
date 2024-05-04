import "server-only";
import { fetchTokenFromDB, insertTokenToDB, updateTokenToDB } from "./db";
import { isJWTExpired } from "@/shared/utils";
import { fetchTokenFromApi } from "./api";
import { createClient } from "../supabase/service";

export const fetchToken = async () => {
  const dbClient = createClient();
  const token = await fetchTokenFromDB(dbClient);
  if (token && !isJWTExpired(token)) {
    return token;
  }

  const newToken = await fetchTokenFromApi();
  if (!token) {
    await insertTokenToDB(newToken, dbClient);
  } else {
    await updateTokenToDB(newToken, dbClient);
  }

  return newToken
};
