import "server-only";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { CouponValueType } from "../types/coupon";

export const addCouponSchema = zfd.formData({
  coupon: zfd.text(),
  value: zfd.numeric(),
  value_type: zfd.numeric(z.nativeEnum(CouponValueType)),
  max_use: zfd.numeric(z.number().optional()),
  checkout_visible: zfd.checkbox(),
  min_cart_value: zfd.numeric(z.number().optional()),
  max_discount: zfd.numeric(z.number().optional()),
});

export const editCouponSchema = zfd.formData({
  id: zfd.numeric(),
  coupon: zfd.text(z.string().optional()),
  value: zfd.numeric(z.number().optional()),
  value_type: zfd.numeric(z.nativeEnum(CouponValueType).optional()),
  max_use: zfd.numeric(z.number().optional()),
  checkout_visible: zfd.checkbox(),
  min_cart_value: zfd.numeric(z.number().optional()),
  max_discount: zfd.numeric(z.number().optional()),
});
