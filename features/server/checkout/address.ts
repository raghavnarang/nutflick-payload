import type { AddressToInsert } from "@/shared/types/zod-schema-types";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/db-schema";

export const insertAddressToCheckout = async (
  addressInput: AddressToInsert,
  checkoutId: number,
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const { data: userData, error: userError } = await dbClient.auth.getUser();
  if (userError || !userData) {
    console.log(userError);
    throw Error("Unable to get current user");
  }

  const userId = userData.user.id;

  const { data: address, error: addressError } = await dbClient
    .from("address")
    .insert({ ...addressInput, user_id: userId })
    .select("id");

  if (addressError || !address || address.length === 0) {
    console.log(addressError);
    throw Error("Unable to add address");
  }

  const { error: checkoutError } = await dbClient
    .from("checkout")
    .update({ address_id: address[0].id })
    .eq("id", checkoutId);

  if (checkoutError) {
    console.log(checkoutError);
    throw Error("Unable to link address to checkout");
  }
};

export const getUserAddresses = async (
  dbClient: ReturnType<typeof createServerClient<Database>>
) => {
  const { data: userData, error: userError } = await dbClient.auth.getUser();
  if (userError || !userData) {
    console.log(userError);
    throw Error("Unable to get current user");
  }

  const userId = userData.user.id;
  const { data: addresses, error: addressError } = await dbClient
    .from("address")
    .select("id, name, phone, state, city, pincode, address")
    .eq("user_id", userId);

  if (addressError || !addresses) {
    console.log(addressError);
    throw Error("Unable to get current user's addresses");
  }

  return addresses;
};
