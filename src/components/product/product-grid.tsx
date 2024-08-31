import { FC, ReactNode } from 'react'
import ProductItem from './product-item'
import { Product } from '@/payload-types'

interface ProductGrid {
  products: Product[]
}

const ProductGrid: FC<ProductGrid> = async ({ products }) => {
  return (
    <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductGrid
