import { getProduct } from "@/lib/shopify";
import type { FC } from "react";
import Image from "next/image";
import ErrorMessage from "@/components/error-message";
import cx from "classnames";
import Link from "next/link";
import AddToCart from "@/components/cart/add-to-cart";

interface ProductProps {
  params: { slug: string };
  searchParams: { [x: string]: string };
}

const Product: FC<ProductProps> = async ({
  params: { slug: productHandle },
  searchParams,
}) => {
  const product = await getProduct(productHandle);

  if (!product) {
    return (
      <div className="flex justify-center">
        <ErrorMessage>
          Error in fetching product or Product is not valid
        </ErrorMessage>
      </div>
    );
  }

  const variant =
    product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) =>
          searchParams[option.name.toLowerCase()] ===
          option.value.replace(" ", "").toLowerCase()
      )
    ) || product.variants[0];

  return (
    <div className="w-full flex gap-10">
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="w-96 h-96 max-w-full relative">
          <Image
            src={product.featuredImage.url}
            fill
            alt={product.featuredImage.altText || product.title}
            className="object-cover rounded-lg z-0"
          />
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <h1 className="text-3xl mb-5">{product.title}</h1>
        <p className="text-gray-700 mb-5">{product.description}</p>
        {product.options.every((option) => option.values.length > 1) &&
          product.options.map((option) => (
            <div key={option.id}>
              <p className="text-lg mb-3">{option.name}</p>
              {option.values.map((value) => {
                const isSelected =
                  searchParams[option.name.toLowerCase()] ===
                  value.replace(" ", "").toLowerCase();

                return (
                  <Link
                    key={value}
                    className={cx(
                      "rounded px-4 py-2 mr-3 last:mr-0 transition-colors",
                      {
                        "text-gray-500 bg-gray-100 hover:bg-gray-200":
                          !isSelected,
                        "text-red-500 bg-red-100 border-red-500": isSelected,
                      }
                    )}
                    href={{
                      pathname: `/product/${product.handle}`,
                      query: {
                        ...searchParams,
                        [option.name.toLowerCase()]: value
                          .replace(" ", "")
                          .toLowerCase(),
                      },
                    }}
                    replace
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          ))}
        <AddToCart bigButton product={product} variant={variant} />
      </div>
    </div>
  );
};

export default Product;
