"use client";

import { useCheckout } from "@/features/checkout";
import Price from "../product/price";
import SectionTitleValue from "../section/title-value";

const CheckoutTotal = () => {
  const { total } = useCheckout();

  return (
    <SectionTitleValue title="Total">
      <Price price={total} />
    </SectionTitleValue>
  );
};

export default CheckoutTotal;
