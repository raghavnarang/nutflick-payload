"use server";

import "server-only";
import { Status } from "@/shared/types/status";
import { addCouponSchema, editCouponSchema } from "@/shared/zod-schemas/coupon";
import {
  deleteCoupon,
  insertCoupon,
  toggleActivation,
  updateCoupon,
} from "../../admin/coupon";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addCoupon = async (prev: any, data: FormData) => {
  try {
    const input = addCouponSchema.parse(data);
    const couponId = await insertCoupon(input);

    return {
      status: Status.success,
      message: "Coupon Added Successfully",
      couponId,
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const editCoupon = async (prev: any, data: FormData) => {
  try {
    const input = editCouponSchema.parse(data);
    const couponId = await updateCoupon(input);

    revalidatePath(`/admin/coupon`);
    revalidatePath(`/checkout`);

    return {
      status: Status.success,
      message: "Coupon Updated Successfully",
      couponId,
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const toggleCouponActivation = async (prev: any, id: number) => {
  try {
    const couponId = z.number().parse(id);
    await toggleActivation(couponId);

    revalidatePath(`/admin/coupon`);
    revalidatePath(`/checkout`);

    return {
      status: Status.success,
      message: "Coupon Toggled Successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};

export const removeCoupon = async (id: number) => {
  try {
    const couponId = z.number().parse(id);
    await deleteCoupon(couponId);

    revalidatePath(`/admin/coupon`);
    revalidatePath(`/checkout`);

    return {
      status: Status.success,
      message: "Coupon Deleted Successfully",
    };
  } catch (e) {
    console.log("Error", e);
    return { status: Status.error, message: "Something went wrong" };
  }
};
