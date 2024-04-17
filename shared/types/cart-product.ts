import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/db-schema";

export interface CartProduct extends Tables<"cart_product"> {}
export interface InsertCartProduct extends TablesInsert<"cart_product"> {}
export interface UpdateCartProduct extends TablesUpdate<"cart_product"> {}
