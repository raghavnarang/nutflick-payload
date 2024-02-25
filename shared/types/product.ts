import { Tables, TablesInsert } from "@/lib/supabase/db-schema";

export interface ProductMinimal {
  image: { url: string; alt: string };
  title: string;
}

export interface ProductVariant extends Tables<"product_variant"> {}
export interface Product extends Omit<Tables<"product">, "variant_seq"> {
  variants?: ProductVariant[];
}

export interface InsertProduct extends TablesInsert<'product'> {}
export interface InsertProductVariant extends TablesInsert<'product_variant'> {}
