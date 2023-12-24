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
              name={product.title + (hasVariants ? ` - ${variant.title}` : "")}
              image={
                hasVariants ? variant.image.url : product.featuredImage.url
              }
              id={variant.id}
              price={parseFloat(variant.price.amount)}
              comparePrice={parseFloat(variant.compareAtPrice.amount)}
              key={variant.id}
              slug={product.handle}
              topLeftTag={hasVariants && variant.title}
              productType={product.productType}
              variantId={
                hasVariants &&
                variant.id.split("gid://shopify/ProductVariant/")[1]
              }
            />
          )),
        ];
      }, [])}
    </div>
  );
};

export default Home;
