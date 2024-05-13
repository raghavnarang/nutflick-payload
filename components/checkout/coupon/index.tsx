"use client";

import { FC, useState } from "react";
import CheckoutCouponsList from "./list";
import CheckoutCouponNonSelected from "./non-selected";
import { Coupon } from "@/shared/types/coupon";
import CheckoutCouponSelected from "./selected";

enum CouponMode {
  DEFAULT,
  APPLY,
}

interface CheckoutCouponsProps {
  subtotal: number;
  coupon?: Pick<Coupon, "id" | "coupon" | "value">;
}

const CheckoutCoupons: FC<CheckoutCouponsProps> = ({ subtotal, coupon }) => {
  const [mode, setMode] = useState(CouponMode.DEFAULT);

  if (mode === CouponMode.APPLY) {
    return (
      <CheckoutCouponsList
        onCancel={() => setMode(CouponMode.DEFAULT)}
        onSuccess={() => setMode(CouponMode.DEFAULT)}
        subtotal={subtotal}
      />
    );
  }

  if (coupon) {
    return <CheckoutCouponSelected {...coupon} subtotal={subtotal} />;
  }

  return (
    <CheckoutCouponNonSelected
      onViewCoupons={() => setMode(CouponMode.APPLY)}
    />
  );
};

export default CheckoutCoupons;
