'use server'

import { Status } from "@/shared/types/status";
import { addAddressSchema } from "@/shared/zod-schemas/address";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import {
  getUserAddresses,
  insertAddressToCheckout,
} from "../../checkout/address";

export const addAddressToCheckout = async (
  checkoutId: number,
  prevState: any,
  data: FormData
) => {
  try {
    const result = addAddressSchema.safeParse(data);
    if (!result.success) {
      console.log("Schema validation failed for add category.", result.error);
      return { status: Status.error, message: "Something went wrong" };
    }

    const dbClient = await createClient(cookies());
    await insertAddressToCheckout(result.data, checkoutId, dbClient);
    const addresses = await getUserAddresses(dbClient);

    return {
      status: Status.success,
      message: "Category added successfully",
      addresses,
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};
