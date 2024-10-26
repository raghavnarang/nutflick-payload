import ProductGrid from '@/components/product/product-grid'
import SyncCart from '@/features/cart/cart-store/sync-cart'
import { getProducts } from '@/features/server/product'

export const metadata = {
  description:
    "Elevate your snacking with Nutflick - India's top destination for premium dry fruits and nuts. Shop now for a taste of excellence!",
  openGraph: {
    type: 'website',
  },
}

const Home = async () => {
  const products = await getProducts()
  return (
    <>
      <ProductGrid products={products} />
      <SyncCart products={products} />
    </>
  )
}

export default Home
