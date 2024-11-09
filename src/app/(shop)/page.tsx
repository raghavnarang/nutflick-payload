import ProductGrid from '@/components/product/product-grid'
import SyncCart from '@/features/cart/cart-store/sync-cart'
import { getProducts } from '@/features/server/product'
import clsx from 'clsx'
import { Dancing_Script } from 'next/font/google'

export const metadata = {
  description:
    "Elevate your snacking with Nutflick - India's top destination for premium dry fruits and nuts. Shop now for a taste of excellence!",
  openGraph: {
    type: 'website',
  },
}

const headingFont = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})

const Home = async () => {
  const products = await getProducts()
  return (
    <>
      <h1
        className={clsx(
          headingFont.className,
          'text-4xl leading-normal md:max-w-full max-w-xs mb-8',
        )}
      >
        Taste the Nutty Goodness with <b>Nutflick</b> 😋
      </h1>
      <ProductGrid products={products} />
      <SyncCart products={products} />
    </>
  )
}

export default Home
