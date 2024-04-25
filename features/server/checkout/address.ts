"use server";

import 'server-only'
import type {
  AddressToInsert,
  AddressToUpdate,
} from "@/shared/types/zod-schema-types";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/db-schema";
import { getCurrentUserId } from "../common/user";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const insertAddress = async (
  addressInput: AddressToInsert,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const userId = await getCurrentUserId(dbClient);

  const { data: address, error: addressError } = await dbClient
    .from("address")
    .insert({ ...addressInput, user_id: userId, preferred: true })
    .select("id");

  if (addressError || !address || address.length === 0) {
    console.log(addressError);
    throw Error("Unable to add address");
  }

  return address[0].id;
};

export const linkAddressToCheckout = async (
  checkoutId: number,
  addressId: number,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createClient(cookies());
  }
  const userId = await getCurrentUserId(dbClient);
  const { error } = await dbClient
    .from("checkout")
    .update({ address_id: addressId })
    .eq("id", checkoutId)
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    throw Error("Unable to link address to checkout");
  }
};

export const getUserAddresses = async (
  dbClient?: ReturnType<typeof createServerClient<Database>>
) => {
  if (!dbClient) {
    dbClient = createClient(cookies());
  }
  const userId = await getCurrentUserId(dbClient);
  const { data: addresses, error: addressError } = await dbClient
    .from("address")
    .select("id, name, phone, state, city, pincode, address, preferred")
    .eq("user_id", userId);

  if (addressError || !addresses) {
    console.log(addressError);
    throw Error("Unable to get current user's addresses");
  }

  return addresses.sort((a, b) => a.id - b.id);
};

export const setPreferredAddress = async (
  id: number,
  dbClient: ReturnType<typeof createServerClient<Database>>,
  setGivenAddressPreferred: boolean = false
) => {
  const userId = await getCurrentUserId(dbClient);
  const { error: falsePreferenceError } = await dbClient
    .from("address")
    .update({ preferred: false })
    .eq("user_id", userId)
    .neq("id", id);

  if (falsePreferenceError) {
    console.log(falsePreferenceError);
    throw Error("Unable to update user's address preferences");
  }

  if (!setGivenAddressPreferred) {
    return;
  }

  const { error: truePreferenceError } = await dbClient
    .from("address")
    .update({ preferred: true })
    .eq("user_id", userId)
    .eq("id", id);

  if (truePreferenceError) {
    console.log(truePreferenceError);
    throw Error("Unable to update user's address preferences");
  }
};

export const updateAddress = async (
  address: AddressToUpdate,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const userId = await getCurrentUserId(dbClient);
  const { error } = await dbClient
    .from("address")
    .update({ ...address, preferred: true })
    .eq("id", address.id)
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    throw Error("Unable to update user's address");
  }
};
