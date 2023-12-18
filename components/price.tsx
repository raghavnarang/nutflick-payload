import { CurrencyPosition } from "@/shared/types/currency";
import type { FC } from "react";

interface PriceProps {
  currencyPosition?: CurrencyPosition;
  currency?: string;
  price: number;
  className?: string;
}

const Price: FC<PriceProps> = ({
  currency,
  currencyPosition,
  price,
  className,
}) => (
  <span className={className}>
    {currencyPosition === CurrencyPosition.Left && currency}
    {price}
    {currencyPosition === CurrencyPosition.Right && currency}
  </span>
);

export default Price;
