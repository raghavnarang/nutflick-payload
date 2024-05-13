"use server";

import "server-only";
import { zfd } from "zod-form-data";
import {
  deleteCheckoutCoupon,
  updateCheckoutCoupon,
} from "../../checkout/coupon";
import { revalidatePath } from "next/cache";
import { Status } from "@/shared/types/status";

export const applyCoupon = async (prevState: any, data: FormData) => {
  try {
    const coupon = zfd.formData({ coupon: zfd.text() }).parse(data).coupon;
    const checkoutId = await updateCheckoutCoupon(coupon);

    revalidatePath(`/checkout/${checkoutId}`);

    return {
      status: Status.success,
      message: "Coupon applied successfully",
    };
  } catch (e) {
    console.log("Error", e);
    revalidatePath("/checkout");
    return {
      status: Status.error,
      message:
        e instanceof Error && "message" in e
          ? e.message
          : "Invalid Coupon / Unable to apply coupon",
    };
  }
};

export const removeCoupon = async (prevState: any) => {
  try {
    const checkoutId = await deleteCheckoutCoupon();
    revalidatePath(`/checkout/${checkoutId}`);

    return {
      status: Status.success,
      message: "Coupon removed successfully",
    };
  } catch (e) {
    console.log("Error", e);
    revalidatePath("/checkout");
    return {
      status: Status.error,
      message: "Unable to remove coupon",
    };
  }
};
