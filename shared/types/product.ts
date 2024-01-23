export interface ProductMinimal {
  image: { url: string; alt: string };
  title: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  image?: string;
  description?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  slug: string;
  title: string;
  price: number;
  comparePrice?: number;
  includedShippingCost?: number;
  image?: string;
  weight: number;
}
