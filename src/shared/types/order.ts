import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/db-schema";

export interface Order extends Tables<"order"> {}
export interface InsertOrder extends TablesInsert<"order"> {}
export interface UpdateOrder extends TablesUpdate<"order"> {}
export interface OrderProduct extends Tables<"order_product"> {}
export interface InsertOrderProduct extends TablesInsert<"order_product"> {}
export interface UpdateOrderProduct extends TablesUpdate<"order_product"> {}
