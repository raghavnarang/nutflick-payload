export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      address: {
        Row: {
          address: string
          city: string
          created_at: string
          id: number
          name: string
          phone: string
          pincode: string
          preferred: boolean | null
          state: string
          user_id: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: number
          name: string
          phone: string
          pincode: string
          preferred?: boolean | null
          state: string
          user_id: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: number
          name?: string
          phone?: string
          pincode?: string
          preferred?: boolean | null
          state?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cart_product: {
        Row: {
          checkout_id: number
          created_at: string
          id: number
          qty: number
          variant_id: number
        }
        Insert: {
          checkout_id: number
          created_at?: string
          id?: number
          qty: number
          variant_id: number
        }
        Update: {
          checkout_id?: number
          created_at?: string
          id?: number
          qty?: number
          variant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_product_checkout_id_fkey"
            columns: ["checkout_id"]
            referencedRelation: "checkout"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_product_variant_id_fkey"
            columns: ["variant_id"]
            referencedRelation: "product_variant"
            referencedColumns: ["id"]
          }
        ]
      }
      checkout: {
        Row: {
          address_id: number | null
          coupon_id: number | null
          created_at: string
          id: number
          shipping_mode: number | null
          user_id: string
        }
        Insert: {
          address_id?: number | null
          coupon_id?: number | null
          created_at?: string
          id?: number
          shipping_mode?: number | null
          user_id: string
        }
        Update: {
          address_id?: number | null
          coupon_id?: number | null
          created_at?: string
          id?: number
          shipping_mode?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkout_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkout_coupon_id_fkey"
            columns: ["coupon_id"]
            referencedRelation: "coupon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkout_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      coupon: {
        Row: {
          checkout_visible: boolean | null
          coupon: string
          created_at: string
          id: number
          is_active: boolean
          max_discount: number | null
          max_use: number | null
          min_cart_value: number | null
          value: number
          value_type: number
        }
        Insert: {
          checkout_visible?: boolean | null
          coupon: string
          created_at?: string
          id?: number
          is_active?: boolean
          max_discount?: number | null
          max_use?: number | null
          min_cart_value?: number | null
          value: number
          value_type?: number
        }
        Update: {
          checkout_visible?: boolean | null
          coupon?: string
          created_at?: string
          id?: number
          is_active?: boolean
          max_discount?: number | null
          max_use?: number | null
          min_cart_value?: number | null
          value?: number
          value_type?: number
        }
        Relationships: []
      }
      order: {
        Row: {
          address: string
          address_id: number | null
          city: string
          coupon: string | null
          coupon_id: number | null
          created_at: string
          discount: number | null
          id: number
          name: string
          phone: string
          pincode: string
          shipping_cost: number | null
          shipping_mode: number | null
          state: string
          user_id: string
        }
        Insert: {
          address: string
          address_id?: number | null
          city: string
          coupon?: string | null
          coupon_id?: number | null
          created_at?: string
          discount?: number | null
          id?: number
          name: string
          phone: string
          pincode: string
          shipping_cost?: number | null
          shipping_mode?: number | null
          state: string
          user_id: string
        }
        Update: {
          address?: string
          address_id?: number | null
          city?: string
          coupon?: string | null
          coupon_id?: number | null
          created_at?: string
          discount?: number | null
          id?: number
          name?: string
          phone?: string
          pincode?: string
          shipping_cost?: number | null
          shipping_mode?: number | null
          state?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_coupon_id_fkey"
            columns: ["coupon_id"]
            referencedRelation: "coupon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      order_product: {
        Row: {
          category_id: number | null
          category_name: string | null
          created_at: string
          id: number
          order_id: number
          price: number
          product_id: number | null
          product_title: string
          qty: number
          variant_id: number | null
          variant_title: string
          weight: number
        }
        Insert: {
          category_id?: number | null
          category_name?: string | null
          created_at?: string
          id?: number
          order_id: number
          price: number
          product_id?: number | null
          product_title: string
          qty: number
          variant_id?: number | null
          variant_title: string
          weight: number
        }
        Update: {
          category_id?: number | null
          category_name?: string | null
          created_at?: string
          id?: number
          order_id?: number
          price?: number
          product_id?: number | null
          product_title?: string
          qty?: number
          variant_id?: number | null
          variant_title?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_product_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_product_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_product_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_product_variant_id_fkey"
            columns: ["variant_id"]
            referencedRelation: "product_variant"
            referencedColumns: ["id"]
          }
        ]
      }
      product: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          image: string | null
          slug: string
          title: string
          variant_seq: Json | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          slug: string
          title: string
          variant_seq?: Json | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          slug?: string
          title?: string
          variant_seq?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "product_category"
            referencedColumns: ["id"]
          }
        ]
      }
      product_category: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      product_variant: {
        Row: {
          compare_price: number | null
          created_at: string
          id: number
          image: string | null
          included_shipping_cost: number | null
          price: number
          product_id: number
          slug: string
          title: string
          weight: number
        }
        Insert: {
          compare_price?: number | null
          created_at?: string
          id?: number
          image?: string | null
          included_shipping_cost?: number | null
          price: number
          product_id: number
          slug: string
          title: string
          weight: number
        }
        Update: {
          compare_price?: number | null
          created_at?: string
          id?: number
          image?: string | null
          included_shipping_cost?: number | null
          price?: number
          product_id?: number
          slug?: string
          title?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variant_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
        ]
      }
      razorpay_orders: {
        Row: {
          created_at: string
          id: number
          order_id: number | null
          rzp_order_id: string | null
          rzp_payment_id: string | null
          rzp_signature: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          order_id?: number | null
          rzp_order_id?: string | null
          rzp_payment_id?: string | null
          rzp_signature?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: number | null
          rzp_order_id?: string | null
          rzp_payment_id?: string | null
          rzp_signature?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "razorpay_orders_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "order"
            referencedColumns: ["id"]
          }
        ]
      }
      tokens: {
        Row: {
          created_at: string
          id: number
          name: string
          secret: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          secret: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          secret?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
