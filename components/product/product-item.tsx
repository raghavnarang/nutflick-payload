import { CurrencyPosition } from "@/shared/types/currency";
import type { Product } from "@/shared/types/product";
import Image from "next/image";
import type { FC } from "react";
import Price from "../price";
import Link from "next/link";

interface ProductItemProps extends Product {
  smallDesc?: string;
  currency?: string;
}

const ProductItem: FC<ProductItemProps> = ({
  smallDesc,
  name,
  image,
  price,
  comparePrice,
  category,
  currency = "₹",
  currencyPosition = CurrencyPosition.Left,
  slug,
}) => (
  <div className="w-full lg:w-1/5 md:w-1/3 sm:w-1/2">
    {image && (
      <Link
        href={`/${category?.slug || "product"}/${slug}`}
        className="w-full 2xl:h-72 xl:h-60 sm:h-52 h-72 relative mb-5 block"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
      </Link>
    )}
    <Link href={`/${category?.slug || "product"}/${slug}`}>
      <span className="font-semibold block">{name}</span>
      {category && (
        <span className="block pt-1 text-gray-600">{category.name}</span>
      )}
    </Link>
    {price && (
      <div className="mt-3">
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
          className="text-xl text-red-500 font-bold ml-2"
        />
      </div>
    )}
  </div>
);

export default ProductItem;
