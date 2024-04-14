import { FC } from "react";
import ProductGrid from "./product-grid";
import { fetchRecommendedProducts } from "@/features/server/common/product";

interface ProductRecommendationsProps {
  categoryId: number;
  productId: number;
}

const ProductRecommendations: FC<ProductRecommendationsProps> = async ({
  productId,
  categoryId
}) => {
  const products = await fetchRecommendedProducts(categoryId, productId);

  if (products.length === 0) return null;
  return (
    <div className="mt-20 mb-10">
      <p className="text-2xl mb-10">Related Products</p>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductRecommendations;
