import { FC, ReactNode } from "react";
import ProductItem from "./product-item";
import { ProductGridItem } from "@/shared/types/product";

interface ProductGrid {
  products: ProductGridItem[];
}

const ProductGrid: FC<ProductGrid> = async ({ products }) => {
  return (
    <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {products.reduce<ReactNode[]>(
        (productNodes, product) => [
          ...productNodes,
          product.variants?.map((variant) => (
            <ProductItem product={product} variant={variant} key={variant.id} />
          )),
        ],
        []
      )}
    </div>
  );
};

export default ProductGrid;
