import { Category } from "./category";
import { CurrencyPosition } from "./currency";

export interface Product {
  id: string;
  name: string;
  price?: number;
  comparePrice?: number;
  image?: string;
  desc?: string;
  category?: Category;
  currency?: string;
  currencyPosition?: CurrencyPosition;
  slug: string;
}
