import type { CartItem as CartItemType } from "@/lib/shopify/types";
import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";
import Price from "../product/price";
import EditCartItem from "./edit-cart-item";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const variantMerch = item.merchandise;
  const product = variantMerch.product;
  const variant =
    product.variants.find(({ id }) => variantMerch.id === id) ||
    product.variants[0];
  const variants = product.variants;
  const hasMultipleVariants = variants.length > 1 || undefined;

  const link = {
    pathname: `/product/${product.handle}`,
    query: hasMultipleVariants && {
      ...variantMerch.selectedOptions.reduce(
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
    <div
      className="flex justify-between items-end border-b border-solid border-gray-200 pb-5 mb-5"
      key={variantMerch.id}
    >
      <div className="flex">
        <Link href={link} className="w-32 h-32 relative mr-5 flex-shrink-0">
          <Image
            src={product.featuredImage.url}
            fill
            alt={product.featuredImage.altText || product.title}
            className="object-cover rounded-md"
          />
        </Link>
        <div className="flex flex-col justify-between">
          <div className="mb-3">
            <span className="block text-gray-500 text-sm mb-1">
              {product.productType}
            </span>
            <Link href={link} className="block mb-1 text-sm md:text-base font-bold md:font-normal">
              {product.title}
              {hasMultipleVariants && ` - ${variantMerch.title}`}
            </Link>
            <Price
              price={parseFloat(variant.price.amount)}
              className="block text-gray-600 text-sm md:text-base"
            />
          </div>
          <EditCartItem item={item} className="!justify-start" />
          <Price
            price={parseFloat(item.cost.totalAmount.amount)}
            className="text-base md:hidden block"
          />
        </div>
      </div>

      <Price
        price={parseFloat(item.cost.totalAmount.amount)}
        className="text-lg text-right hidden md:block"
      />
    </div>
  );
};

export default CartItem;
