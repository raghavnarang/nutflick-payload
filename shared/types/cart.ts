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

export interface Discount {
  code: string;
  percent?: number;
  value?: number;
}

export interface Shipping {
  label: string;
  value: number;
}

export interface Cart {
  items: CartProduct[];
  discount?: Discount;
  shipping?: Shipping;
}
