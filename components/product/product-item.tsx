import Image from "next/image";
import { Suspense, type FC } from "react";
import Price from "./price";
import Link from "next/link";
import AddToCart from "../cart/add-to-cart";
import EditCartItem from "../cart/edit-cart-item";
import type {
  ProductGridItem,
  ProductVariantGridItem,
} from "@/shared/types/product";

interface ProductItemProps {
  product: ProductGridItem;
  variant: ProductVariantGridItem;
  // cartItem?: CartItem;
}

const ProductItem: FC<ProductItemProps> = ({ product, variant }) => {
  const { slug } = product;
  const hasMultipleVariants = product.variants && product.variants.length > 1;

  const link = {
    pathname: `/product/${slug}`,
    query: hasMultipleVariants ? { variant: variant.id } : {},
  };

  const image = variant.image || product.image;

  return (
    <div className="w-full">
      {image && (
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
            src={image}
            alt={product.title}
            fill
            className="object-cover rounded-lg z-0"
          />
        </Link>
      )}

      <Link href={link}>
        {/* {product.productType && (
          <span className="block mb-1 text-gray-600 text-sm">
            {product.productType}
          </span>
        )} */}
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
        {/* <Suspense fallback={<p>Adding to cart...</p>}>
          {!cartItem ? (
            <AddToCart variantId={variant.id} showIcon />
          ) : (
            <EditCartItem item={cartItem} className="!flex-row" />
          )}
        </Suspense> */}
      </div>
    </div>
  );
};

export default ProductItem;
