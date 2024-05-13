"use server";

import "server-only";
import { ShippingMode } from "@/shared/types/shipping";
import { Status } from "@/shared/types/status";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { updateShippingMode } from "../../checkout/shipping";
import { revalidatePath } from "next/cache";

export const changeShippingMode = async (prev: any, data: FormData) => {
  try {
    const mode = zfd
      .formData({ mode: zfd.numeric(z.nativeEnum(ShippingMode).optional()) })
      .parse(data).mode;

    const checkoutId = await updateShippingMode(mode || ShippingMode.SURFACE);

    revalidatePath(`/checkout/${checkoutId}`);

    return {
      message: "Updated shipping mode",
      status: Status.success,
    };
  } catch (e) {
    console.log(e);
    revalidatePath("/checkout");
    return {
      message: "Unable to change shipping mode",
      status: Status.error,
    };
  }
};
