import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createActionsClient } from "@/lib/supabase/actions";
import { addCouponSchema, editCouponSchema } from "@/shared/zod-schemas/coupon";
import { cookies } from "next/headers";
import "server-only";
import { z } from "zod";

export const getCoupons = async () => {
  const dbClient = createServerClient(cookies());
  const { data: coupons, error } = await dbClient.from("coupon").select();

  if (error || !coupons) {
    const errMsg = "Unable to fetch coupons";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return coupons.sort((a, b) => a.id - b.id);
};

export const insertCoupon = async (data: z.infer<typeof addCouponSchema>) => {
  const dbClient = createActionsClient(cookies());
  const { data: coupon, error } = await dbClient
    .from("coupon")
    .insert(data)
    .select("id");

  if (error || !coupon || coupon.length === 0) {
    const errMsg = "Unable to insert coupon";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return coupon[0].id;
};

export const getCouponById = async (id: number) => {
  const dbClient = createServerClient(cookies());
  const { data: coupon, error } = await dbClient
    .from("coupon")
    .select()
    .eq("id", id);

  if (error || !coupon || coupon.length === 0) {
    const errMsg = "Unable to fetch coupon";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return coupon[0];
};

export const updateCoupon = async (data: z.infer<typeof editCouponSchema>) => {
  const dbClient = createActionsClient(cookies());
  const { error } = await dbClient
    .from("coupon")
    .update({ ...data, max_use: data.max_use || null })
    .eq("id", data.id);

  if (error) {
    const errMsg = "Unable to update coupon";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return data.id;
};

export const toggleActivation = async (id: number) => {
  const dbClient = createActionsClient(cookies());
  const { data: isActiveResponse, error: isActiveErr } = await dbClient
    .from("coupon")
    .select("is_active")
    .eq("id", id);

  if (isActiveErr || !isActiveResponse || isActiveResponse.length === 0) {
    const errMsg = "Unable to get current activation status of coupon";
    console.log(isActiveErr || errMsg);
    throw Error(errMsg);
  }

  const { error: updateErr } = await dbClient
    .from("coupon")
    .update({ is_active: !isActiveResponse[0].is_active })
    .eq("id", id);

  if (updateErr) {
    const errMsg = "Unable to toggle coupon activation status";
    console.log(updateErr || errMsg);
    throw Error(errMsg);
  }
};
