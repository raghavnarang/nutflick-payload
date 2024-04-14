import Image from "next/image";
import { Suspense, type FC } from "react";
import Price from "./price";
import Link from "next/link";
import type {
  ProductGridItem,
  ProductVariantGridItem,
} from "@/shared/types/product";
import Photo from "../Icons/photo";
import { Cart } from "../Icons";
import Button from "../button";
import AddToCart from "../cart/add-to-cart";

interface ProductItemProps {
  product: ProductGridItem;
  variant: ProductVariantGridItem;
}

const ProductItem: FC<ProductItemProps> = ({ product, variant }) => {
  const hasMultipleVariants = product.variants && product.variants.length > 1;

  const link = `/product/${product.slug}/${variant.slug}`;

  const image = variant.image || product.image;

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
        {image ? (
          <Image
            src={image}
            alt={
              product.title + hasMultipleVariants ? ` - ${variant.title}` : ""
            }
            fill
            className="object-cover rounded-lg z-0"
          />
        ) : (
          <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
            <Photo className="!size-10 text-gray-400" />
          </div>
        )}
      </Link>

      <Link href={link}>
        {product.category && (
          <span className="block mb-1 text-gray-600 text-sm">
            {product.category.name}
          </span>
        )}
        <span className="block">
          {product.title}
          {hasMultipleVariants ? ` - ${variant.title}` : ""}
        </span>
      </Link>

      <div className="mt-3">
        {variant.comparePrice && (
          <Price
            price={variant.comparePrice}
            className="line-through text-gray-500"
          />
        )}
        <Price price={variant.price} className="text-xl ml-2" />
      </div>
      <div className="mt-3">
        <Suspense>
          <AddToCart product={product} variant={variant} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductItem;
