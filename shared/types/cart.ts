export interface CartProduct {
  productId: number;
  variantId: number;
  title: string;
  image?: string;
  price: number;
  qty: number;
  link: string;
  category?: string;
}

export interface Cart {
  items: CartProduct[];
  exp: number;
}
