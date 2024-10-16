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
  shippingCovered?: number | null
}

export interface Cart {
  items: CartItem[]
  exp: number
}
