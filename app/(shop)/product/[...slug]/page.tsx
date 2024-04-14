import { Suspense, type FC } from "react";
import Image from "next/image";
import cx from "classnames";
import Link from "next/link";
import AddToCart from "@/components/cart/add-to-cart";
import ProductRecommendations from "@/components/product/product-recommendations";
import BigMessage from "@/components/big-message";
import Sad from "@/components/Icons/sad";
import { fetchProduct } from "@/features/server/admin/product";
import { createClient } from "@/lib/supabase/static";
import Photo from "@/components/Icons/photo";
import { fetchProductsForGrid } from "@/features/server/common/product";

interface ProductProps {
  params: { slug: [productSlug: string, variantSlug?: string] };
}

const Product: FC<ProductProps> = async ({
  params: {
    slug: [productSlug, variantSlug],
  },
}) => {
  const product = await fetchProduct(productSlug, createClient());

  if (!product) {
    return (
      <BigMessage
        icon={Sad}
        button={{ text: <Link href="/">Go to Home</Link> }}
      >
        Error in fetching product or Product is not valid
      </BigMessage>
    );
  }

  const variant =
    (variantSlug &&
      product.variants.find(
        (variant) => variant.slug.toLowerCase() === variantSlug.toLowerCase()
      )) ||
    product.variants[0];

  const image = variant.image || product.image;

  return (
    <div>
      <div className="w-full flex gap-10 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="md:size-96 sm:h-96 w-full h-64 max-w-full relative">
            {image ? (
              <Image
                src={image}
                fill
                alt={`${product.title} - ${variant.title}`}
                className="object-cover rounded-lg z-0"
              />
            ) : (
              <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
                <Photo className="!size-10 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl mb-5">{product.title}</h1>
          <p className="text-gray-700 mb-5">{product.description}</p>

          <div>
            <p className="text-lg mb-3">Size</p>
            {product.variants.map((v) => {
              const isSelected =
                v.slug.toLowerCase() === variant.slug.toLowerCase();

              return (
                <Link
                  key={v.id}
                  className={cx(
                    "rounded px-4 py-2 mr-3 last:mr-0 transition-colors inline-block",
                    {
                      "text-gray-500 bg-gray-100 hover:bg-gray-200":
                        !isSelected,
                      "text-red-500 bg-red-100 border-red-500": isSelected,
                    }
                  )}
                  href={`/product/${product.slug}/${v.slug}`}
                  replace
                >
                  {v.title}
                </Link>
              );
            })}
          </div>
          <div className="mt-10">
            <AddToCart bigButton product={product} variant={variant} />
          </div>
        </div>
      </div>
      {product.category?.id && (
        <Suspense>
          <ProductRecommendations
            categoryId={product.category?.id}
            productId={product.id}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Product;

export async function generateStaticParams() {
  const products = await fetchProductsForGrid();

  return products.reduce<{ slug: string[] }[]>(
    (slugs, p) => [
      ...slugs,
      ...p.variants.map((v) => ({ slug: [p.slug, v.slug] })),
      { slug: [p.slug] },
    ],
    []
  );
}
