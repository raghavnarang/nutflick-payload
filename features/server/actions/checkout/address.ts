"use server";

import "server-only";
import { Status } from "@/shared/types/status";
import {
  addAddressSchema,
  updateAddressSchema,
} from "@/shared/zod-schemas/address";
import { createClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import {
  insertAddress,
  setPreferredAddress,
  linkAddressToCheckout,
  updateAddress,
} from "../../checkout/address";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const addAddressToCheckout = async (
  checkoutId: number,
  prevState: any,
  data: FormData
) => {
  try {
    const address = addAddressSchema.parse(data);
    const parsedCheckoutId = z.number().parse(checkoutId);
    const dbClient = createClient(cookies());
    const id = await insertAddress(address, dbClient);
    await linkAddressToCheckout(parsedCheckoutId, id, dbClient);
    await setPreferredAddress(id, dbClient);

    revalidatePath(`/checkout/${parsedCheckoutId}`);

    return {
      status: Status.success,
      message: "Address added successfully",
    };
  } catch (e) {
    console.log("Error", e);
    revalidatePath("/checkout");
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const editAddressAndAddToCheckout = async (
  checkoutId: number,
  prevState: any,
  data: FormData
) => {
  try {
    const address = updateAddressSchema.parse(data);
    const parsedCheckoutId = z.number().parse(checkoutId);
    const dbClient = createClient(cookies());
    await updateAddress(address, dbClient);
    await linkAddressToCheckout(parsedCheckoutId, address.id, dbClient);
    await setPreferredAddress(address.id, dbClient);

    revalidatePath(`/checkout/${parsedCheckoutId}`);

    return {
      status: Status.success,
      message: "Address updated successfully",
    };
  } catch (e) {
    console.log("Error", e);
    revalidatePath("/checkout");
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const selectAddressForCheckout = async (
  checkoutId: number,
  prevState: any,
  data: FormData
) => {
  try {
    const parsedCheckoutId = z.number().parse(checkoutId);
    const addressId = zfd.formData({ id: zfd.numeric() }).parse(data).id;

    const dbClient = createClient(cookies());
    await linkAddressToCheckout(parsedCheckoutId, addressId, dbClient);
    await setPreferredAddress(addressId, dbClient, true);

    revalidatePath(`/checkout/${checkoutId}`);

    return {
      status: Status.success,
      message: "Address selected successfully",
    };
  } catch (e) {
    console.log("Error", e);
    revalidatePath("/checkout");
    return { status: Status.error, message: "Something went wrong" };
  }
};
