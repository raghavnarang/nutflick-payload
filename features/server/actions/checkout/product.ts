"use server";

import { Status } from "@/shared/types/status";
import "server-only";
import { z } from "zod";
import {
  deleteCartProduct,
  updateCartProductQty,
} from "../../checkout/product";
import { zfd } from "zod-form-data";
import { revalidatePath } from "next/cache";

export const changeCartProductQty = async (prev: any, data: FormData) => {
  try {
    const { variantId, qty } = zfd
      .formData({
        variantId: zfd.numeric(),
        qty: zfd.numeric(z.number().gte(1)),
      })
      .parse(data);

    const checkoutId = await updateCartProductQty(variantId, qty);

    revalidatePath(`/admin/checkout/${checkoutId}`);

    return {
      message: "Updated Quantity",
      qty,
      status: Status.success,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Unable to change cart product quantity",
      status: Status.error,
    };
  }
};

export const removeCartProduct = async (prev: any, data: FormData) => {
  try {
    const { variantId } = zfd
      .formData({ variantId: zfd.numeric() })
      .parse(data);

    const checkoutId = await deleteCartProduct(variantId);

    revalidatePath(`/admin/checkout/${checkoutId}`);

    return {
      message: "Deleted Product from Checkout",
      status: Status.success,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Unable to delete cart product",
      status: Status.error,
    };
  }
};
