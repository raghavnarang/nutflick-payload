"use server";

import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createActionClient } from "@/lib/supabase/actions";
import { cookies } from "next/headers";
import "server-only";
import { getCurrentUserCheckoutSubtotal } from "../common/checkout";
import { getCurrentUserCheckoutId } from "../common/user";

export const getCheckoutCoupons = async () => {
  const dbClient = createServerClient(cookies());
  const { data: coupons, error } = await dbClient
    .from("coupon")
    .select("id, coupon, value, value_type, min_cart_value, max_discount")
    .eq("is_active", true)
    .eq("checkout_visible", true);

  if (error || !coupons) {
    const errMsg = "Unable to fetch checkout coupons";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return coupons.sort((a, b) => a.id - b.id);
};

export const updateCheckoutCoupon = async (coupon: string) => {
  const dbClient = createActionClient(cookies());

  /** TODO: Add max_use logic */
  const { data, error: selectError } = await dbClient
    .from("coupon")
    .select("id, min_cart_value")
    .eq("is_active", true)
    .eq("coupon", coupon.toLowerCase());

  if (selectError || !data || data.length === 0) {
    const errMsg = "Invalid coupon";
    console.log(selectError || errMsg);
    throw Error(errMsg);
  }

  const couponId = data[0].id;
  const minCartVal = data[0].min_cart_value;
  const { checkoutId, subtotal } = await getCurrentUserCheckoutSubtotal(
    dbClient
  );

  if (minCartVal && subtotal < minCartVal) {
    const errMsg = `Add more items worth ₹${(minCartVal - subtotal).toFixed(
      2
    )} to use this coupon`;
    console.log(errMsg);
    throw Error(errMsg);
  }

  const { error: updateError } = await dbClient
    .from("checkout")
    .update({ coupon_id: couponId })
    .eq("id", checkoutId);

  if (updateError) {
    const errMsg = "Unable to apply coupon on checkout";
    console.log(selectError || errMsg);
    throw Error(errMsg);
  }

  return checkoutId;
};

export const deleteCheckoutCoupon = async () => {
  const dbClient = createActionClient(cookies());

  const checkoutId = await getCurrentUserCheckoutId(dbClient);
  const { error } = await dbClient
    .from("checkout")
    .update({ coupon_id: null })
    .eq("id", checkoutId);

  if (error) {
    const errMsg = "Unable to remove coupon from checkout";
    console.log(error || errMsg);
    throw Error(errMsg);
  }

  return checkoutId;
};
