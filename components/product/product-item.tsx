import Image from "next/image";
import { Suspense, type FC } from "react";
import Price from "./price";
import Link from "next/link";
import type { CartItem, Product, ProductVariant } from "@/lib/shopify/types";
import AddToCart from "../cart/add-to-cart";
import EditCartItem from "../cart/edit-cart-item";

interface ProductItemProps {
  product: Product;
  variant: ProductVariant;
  cartItem?: CartItem;
}

const ProductItem: FC<ProductItemProps> = ({ product, variant, cartItem }) => {
  const { handle: slug } = product;
  const hasMultipleVariants = product.variants.length > 1;

  const link = {
    pathname: `/product/${slug}`,
    query: hasMultipleVariants && {
      ...variant?.selectedOptions.reduce(
        (final, current) => ({
          ...final,
          [current.name.toLowerCase()]: current.value
            .replace(" ", "")
            .toLowerCase(),
        }),
        {}
      ),
    },
  };

  return (
    <div className="w-full">
      <Link
        href={link}
        className="w-full 2xl:h-72 xl:h-60 sm:h-52 h-72 relative mb-5 block"
      >
        {hasMultipleVariants && (
          <span className="absolute top-3 right-3 bg-white text-green-600 rounded-md z-10 text-sm py-1 px-2">
            {variant.title}
          </span>
        )}
        <Image
          src={variant?.image.url || product.featuredImage.url}
          alt={
            variant?.image.altText ||
            product.featuredImage.altText ||
            product.title
          }
          fill
          className="object-cover rounded-lg z-0"
        />
      </Link>

      <Link href={link}>
        {product.productType && (
          <span className="block mb-1 text-gray-600 text-sm">
            {product.productType}
          </span>
        )}
        <span className="block">
          {product.title}
          {hasMultipleVariants ? ` - ${variant.title}` : ""}
        </span>
      </Link>

      <div className="mt-3">
        {variant.compareAtPrice.amount && (
          <Price
            price={parseFloat(variant.compareAtPrice.amount)}
            className="line-through text-gray-500"
          />
        )}
        <Price
          price={parseFloat(variant.price.amount)}
          className="text-xl ml-2"
        />
      </div>
      <div className="mt-3">
        <Suspense fallback={<p>Adding to cart...</p>}>
          {!cartItem ? (
            <AddToCart variantId={variant.id} showIcon />
          ) : (
            <EditCartItem item={cartItem} className="!flex-row" />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default ProductItem;
