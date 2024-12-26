import Container from '@/components/container'
import ProductGrid from '@/components/product/product-grid'
import { Product } from '@/payload-types'
import clsx from 'clsx'

interface BlockProps {
  title: string
  subtitle: string
  products: Product[]
  hideBorderBottom?: boolean
}

export default async function ProductsBlockComponent({
  products,
  title,
  subtitle,
  hideBorderBottom,
}: BlockProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <Container className={clsx('md:py-12 py-7 border-b border-gray-300', { '!border-b-0': hideBorderBottom })}>
      <div className="mb-12 text-center">
        <h2 className="md:mb-2 mb-1 inline-block md:text-3xl text-xl font-extrabold leading-normal md:max-w-full bg-gradient-to-r to-orange-600 from-primary text-transparent bg-clip-text">
          {title}
        </h2>
        <p className="font-medium md:text-base text-sm">{subtitle}</p>
      </div>

      <ProductGrid products={products} />
    </Container>
  )
}
