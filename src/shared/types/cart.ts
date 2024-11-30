export interface CartItem {
  productId: number
  variantId: string
  title: string
  image?: string
  price: number
  qty: number
  productSlug: string
  variantSlug: string
  category?: string
  includedShippingCost?: number | null,
  weight: number
}

export interface Cart {
  items: CartItem[]
  exp: number
}
