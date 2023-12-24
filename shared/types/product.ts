import { CurrencyPosition } from "./currency";

export interface Product {
  id: string;
  name: string;
  price?: number;
  comparePrice?: number;
  image?: string;
  desc?: string;
  currency?: string;
  currencyPosition?: CurrencyPosition;
  slug: string;
  productType: string;
}
