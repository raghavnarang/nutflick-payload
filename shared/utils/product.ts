import { Product, ProductVariant } from "@/lib/shopify/types";

export const getVariantTitle = (
  product: Product,
  variant: ProductVariant = product.variants[0]
) => product.title + (product.variants.length > 1 ? ` - ${variant.title}` : "");

export const getImage = (
  product: Product,
  variant: ProductVariant = product.variants[0]
) => ({
  url: variant.image.url || product.featuredImage.url,
  alt: variant.image.altText || product.featuredImage.altText || product.title,
});
