"use server";

import { Status } from "@/shared/types/status";
import { addAddressSchema, updateAddressSchema } from "@/shared/zod-schemas/address";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import {
  getUserAddresses,
  insertAddress,
  setPreferredAddress,
  addAddressToCheckout as addAddressToCheckoutDB,
  updateAddress
} from "../../checkout/address";
import { revalidatePath } from "next/cache";

export const addAddressToCheckout = async (
  checkoutId: number,
  prevState: any,
  data: FormData
) => {
  try {
    const result = addAddressSchema.safeParse(data);
    if (!result.success) {
      console.log("Schema validation failed for add address.", result.error);
      return { status: Status.error, message: "Something went wrong" };
    }

    const dbClient = createClient(cookies());
    const id = await insertAddress(result.data, dbClient);
    await addAddressToCheckoutDB(checkoutId, id, dbClient);
    await setPreferredAddress(id, dbClient);

    revalidatePath(`/admin/checkout/${checkoutId}`);

    return {
      status: Status.success,
      message: "Address added successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const editAddressAndAddToCheckout = async (
  checkoutId: number,
  prevState: any,
  data: FormData
) => {
  try {
    const result = updateAddressSchema.safeParse(data);
    if (!result.success) {
      console.log("Schema validation failed for edit category.", result.error);
      return { status: Status.error, message: "Something went wrong" };
    }

    const dbClient = createClient(cookies());
    await updateAddress(result.data, dbClient);
    await addAddressToCheckoutDB(checkoutId, result.data.id, dbClient);
    await setPreferredAddress(result.data.id, dbClient);

    revalidatePath(`/admin/checkout/${checkoutId}`);

    return {
      status: Status.success,
      message: "Address updated successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};
