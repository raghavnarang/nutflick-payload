import { FC } from 'react'
import ProductGrid from './product-grid'
import { getRecommendedProducts } from '@/features/server/product'

interface ProductRecommendationsProps {
  categoryId: number
  productId: number
}

const ProductRecommendations: FC<ProductRecommendationsProps> = async ({
  productId,
  categoryId,
}) => {
  const products = await getRecommendedProducts(categoryId, productId)

  if (products.length === 0) return null
  return (
    <div className="md:mt-20 mt-5 md:mb-10">
      <p className="text-2xl mb-10">Related Products</p>
      <ProductGrid products={products} />
    </div>
  )
}

export default ProductRecommendations
