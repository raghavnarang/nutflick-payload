import 'server-only'

import { FC } from 'react'
import ProductItem from './product-item'
import { Product } from '@/payload-types'
import clsx from 'clsx'
import SyncCart from '@/features/cart/cart-store/sync-cart'

interface ProductGrid {
  products: Product[]
  className?: string
}

const ProductGrid: FC<ProductGrid> = async ({ products, className }) => {
  return (
    <div
      className={clsx(
        'grid md:gap-12 gap-4 gap-y-8 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2',
        className,
      )}
    >
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
      <SyncCart products={products} />
    </div>
  )
}

export default ProductGrid
