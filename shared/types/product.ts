import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/db-schema";

export interface ProductMinimal {
  image: { url: string; alt: string };
  title: string;
}

export interface ProductVariant extends Tables<"product_variant"> {}
export interface Product extends Omit<Tables<"product">, "variant_seq"> {
  variants?: ProductVariant[];
}

export interface InsertProduct extends TablesInsert<"product"> {}
export interface InsertProductVariant extends TablesInsert<"product_variant"> {}

export interface UpdateProduct extends TablesUpdate<"product"> {}
export interface UpdateProductVariant extends TablesUpdate<"product_variant"> {}

export interface ProductVariantGridItem
  extends Omit<
    ProductVariant,
    | "created_at"
    | "product_id"
    | "included_shipping_cost"
    | "weight"
    | "compare_price"
  > {
  comparePrice?: ProductVariant["compare_price"];
  weight?: ProductVariant["weight"],
  costToBear?: ProductVariant["included_shipping_cost"]
}
export interface ProductGridItem
  extends Omit<
    Product,
    "created_at" | "description" | "variants" | "category_id"
  > {
  variants?: ProductVariantGridItem[];
  category: {
    name: string;
  } | null;
}
