import { getCart, getProduct } from "@/lib/shopify";
import { Suspense, type FC } from "react";
import Image from "next/image";
import ErrorMessage from "@/components/error-message";
import cx from "classnames";
import Link from "next/link";
import AddToCart from "@/components/cart/add-to-cart";
import { cookies } from "next/headers";
import EditCartItem from "@/components/cart/edit-cart-item";
import ProductRecommendations from "@/components/product/product-recommendations";
import BigMessage from "@/components/big-message";
import Sad from "@/components/Icons/sad";

interface ProductProps {
  params: { slug: string };
  searchParams: { [x: string]: string };
}

const Product: FC<ProductProps> = async ({
  params: { slug: productHandle },
  searchParams,
}) => {
  const product = await getProduct(productHandle);

  const cartId = cookies().get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  if (!product) {
    return (
      <BigMessage icon={Sad} button={{ text: <Link href="/">Go to Home</Link> }}>
        Error in fetching product or Product is not valid
      </BigMessage>
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

  const cartItem = cart?.lines.find(
    (line) => line.merchandise.id === variant.id
  );

  return (
    <div>
      <div className="w-full flex gap-10 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="md:size-96 sm:h-96 w-full h-64 max-w-full relative">
            <Image
              src={product.featuredImage.url}
              fill
              alt={product.featuredImage.altText || product.title}
              className="object-cover rounded-lg z-0"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
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
                        "rounded px-4 py-2 mr-3 last:mr-0 transition-colors inline-block",
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
          <div className="mt-10">
            {cartItem && <p className="text-lg mb-3">Quantity (in cart)</p>}
            {!cartItem ? (
              <AddToCart bigButton variantId={variant.id} />
            ) : (
              <EditCartItem item={cartItem} bigButton />
            )}
          </div>
        </div>
      </div>
      <Suspense>
        <ProductRecommendations productId={product.id} />
      </Suspense>
    </div>
  );
};

export default Product;
