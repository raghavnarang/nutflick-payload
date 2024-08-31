import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/db-schema";

export enum CouponValueType {
  FIXED = 1,
  PERCENTAGE = 2,
}

export interface Coupon extends Tables<"coupon"> {}
export interface InsertCoupon extends TablesInsert<"coupon"> {}
export interface UpdateCoupon extends TablesUpdate<"coupon"> {}