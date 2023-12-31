import { getProductRecommendations, getProducts } from "@/lib/shopify";
import { FC } from "react";
import ProductGrid from "./product-grid";

interface ProductRecommendationsProps {
  productId: string;
}

const ProductRecommendations: FC<ProductRecommendationsProps> = async ({
  productId,
}) => {
  const products = await getProductRecommendations(productId);

  if (products.length === 0) return null;
  return (
    <div className="mt-20 mb-10">
      <p className="text-2xl text-center mb-10">Related Products</p>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductRecommendations;
