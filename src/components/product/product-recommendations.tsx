import { FC } from 'react'
import ProductGrid from './product-grid'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

interface ProductRecommendationsProps {
  categoryId: number
  productId: number
}

const ProductRecommendations: FC<ProductRecommendationsProps> = async ({
  productId,
  categoryId,
}) => {
  console.log(categoryId)
  const payload = await getPayloadHMR({ config })
  const data = await payload.find({
    collection: 'products',
    limit: 8,
    where: { 'category.value': { equals: categoryId }, id: { not_equals: productId } },
  })

  if (data.docs.length === 0) return null
  return (
    <div className="mt-20 mb-10">
      <p className="text-2xl mb-10">Related Products</p>
      <ProductGrid products={data.docs} />
    </div>
  )
}

export default ProductRecommendations
