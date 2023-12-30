import ProductItem from "@/components/product/product-item";
import { getCart, getProducts } from "@/lib/shopify";
import { cookies } from "next/headers";
import { ReactNode } from "react";

const Home = async () => {
  const products = await getProducts({});

  const cartId = cookies().get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  return (
    <div className="flex flex-wrap gap-10 w-auto justify-center">
      {products.reduce<ReactNode[]>(
        (productNodes, product) => [
          ...productNodes,
          product.variants.map((variant) => (
            <ProductItem
              product={product}
              variant={variant}
              cartItem={cart?.lines.find(
                (item) => item.merchandise.id === variant.id
              )}
              key={variant.id}
            />
          )),
        ],
        []
      )}
    </div>
  );
};

export default Home;
