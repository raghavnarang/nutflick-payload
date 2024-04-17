import { CartProduct } from "@/shared/types/cart";
import type {
  ProductGridItem,
  ProductVariantGridItem,
} from "@/shared/types/product";

export const getCartProduct = (
  product: ProductGridItem,
  variant: ProductVariantGridItem,
  forceVariantLink: boolean = false,
  qty?: number
): CartProduct => ({
  productId: product.id,
  variantId: variant.id,
  title: `${product.title} - ${variant.title}`,
  image: variant.image || product.image || undefined,
  qty: qty || 1,
  price: variant.price,
  link: `/product/${product.slug}${
    (product.variants && product.variants.length > 1) || forceVariantLink
      ? `/${variant.slug}`
      : ""
  }`,
  category: product.category?.name,
});
