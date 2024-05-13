"use client";

import { useCheckout } from "@/features/checkout";
import Price from "../product/price";
import SectionTitleValue from "../section/title-value";
import type { Coupon } from "@/shared/types/coupon";
import { FC } from "react";

interface CheckoutTotalProps {
  coupon?: Pick<Coupon, "id" | "coupon" | "value">;
}

const CheckoutTotal: FC<CheckoutTotalProps> = ({ coupon }) => {
  const { total } = useCheckout();

  return (
    <SectionTitleValue title="Total">
      <Price price={total - (coupon?.value || 0)} />
    </SectionTitleValue>
  );
};

export default CheckoutTotal;
