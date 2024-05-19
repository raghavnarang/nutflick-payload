import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/db-schema";

export enum OrderStatus {
  // 1- Payment Pending, 2- Payment Failed, 3- In-Process (Payment Done), 4- Completed, 5- Refund Requested, 6- Refund Failed, 7- Refund Rejected, 8- Refund In Process, 9- Refunded
  PAYMENT_PENDING = 1,
  PAYMENT_FAILED = 2,
  IN_PROCESS = 3,
  COMPLETED = 4,
  REFUND_REQUESTED = 5,
  REFUND_FAILED = 6,
  REFUND_REJECTED = 7,
  REFUND_IN_PROCESS = 8,
  REFUNDED = 9,
}

export interface Order extends Tables<"order"> {}
export interface InsertOrder extends TablesInsert<"order"> {}
export interface UpdateOrder extends TablesUpdate<"order"> {}
export interface OrderProduct extends Tables<"order_product"> {}
export interface InsertOrderProduct extends TablesInsert<"order_product"> {}
export interface UpdateOrderProduct extends TablesUpdate<"order_product"> {}
