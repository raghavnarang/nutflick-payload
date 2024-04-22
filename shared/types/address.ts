import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/db-schema";

export interface Address extends Tables<"address"> {}
export interface InsertAddress extends TablesInsert<"address"> {}
export interface UpdateAddress extends TablesUpdate<"address"> {}
export interface MinimalAddress
  extends Omit<Address, "created_at" | "preferred" | "user_id"> {}
