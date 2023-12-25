import type { Product } from "@/shared/types/product";
import Image from "next/image";
import type { FC } from "react";
import Price from "./price";
import Link from "next/link";
import AddToCart from "../cart/product-item/add-to-cart";

interface ProductItemProps extends Product {
  smallDesc?: string;
  currency?: string;
  topLeftTag?: string;
  variantId?: string;
}

const ProductItem: FC<ProductItemProps> = ({
  smallDesc,
  name,
  image,
  price,
  comparePrice,
  currency,
  currencyPosition,
  slug,
  topLeftTag,
  productType,
  variantId,
  id,
}) => {
  const link = `/product/${slug}` + (variantId ? `?variant=${variantId}` : "");
  return (
    <div className="w-full lg:w-1/5 md:w-1/3 sm:w-1/2">
      {image && (
        <Link
          href={link}
          className="w-full 2xl:h-72 xl:h-60 sm:h-52 h-72 relative mb-5 block"
        >
          {topLeftTag && (
            <span className="absolute top-3 right-3 bg-white text-green-600 rounded-md z-10 text-sm py-1 px-2">
              {topLeftTag}
            </span>
          )}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-lg z-0"
          />
        </Link>
      )}
      <Link href={link}>
        {productType && (
          <span className="block mb-1 text-gray-600 text-sm">
            {productType}
          </span>
        )}
        <span className="block">{name}</span>
      </Link>
      <div className="flex items-end justify-between mt-3">
        {price && (
          <div>
            {comparePrice && (
              <Price
                price={comparePrice}
                currency={currency}
                currencyPosition={currencyPosition}
                className="line-through text-gray-500"
              />
            )}
            <Price
              price={price}
              currency={currency}
              currencyPosition={currencyPosition}
              className="text-xl ml-2"
            />
          </div>
        )}
        <AddToCart variantId={id} />
      </div>
    </div>
  );
};

export default ProductItem;
