import ProductItem from "@/components/product/product-item";
import { getProducts } from "@/lib/shopify";
import { ReactNode } from "react";

const Home = async () => {
  const products = await getProducts({});

  return (
    <div className="flex flex-wrap gap-10 w-auto justify-center">
      {products.reduce<ReactNode[]>((productNodes, product) => {
        const hasVariants = product.variants.length > 1 || undefined;

        return [
          ...productNodes,
          product.variants.map((variant) => (
            <ProductItem
              product={product}
              variant={product.variants.length > 1 ? variant : undefined}
            />
          )),
        ];
      }, [])}
    </div>
  );
};

export default Home;
