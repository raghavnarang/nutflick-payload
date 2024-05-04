export interface CartProduct {
  productId: number;
  variantId: number;
  title: string;
  image?: string;
  price: number;
  qty: number;
  link: string;
  category?: string;
  weight?: number;
  costToBear?: number;
}

export interface Cart {
  items: CartProduct[];
  exp: number;
}
