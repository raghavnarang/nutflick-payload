import ProductGrid from '@/components/product/product-grid'
import SyncCart from '@/features/cart/cart-store/sync-cart'
import { getProducts } from '@/features/server/product'
import clsx from 'clsx'
import { Dancing_Script } from 'next/font/google'
import type { OnlineStore, WithContext } from 'schema-dts'
import logo from '@/public/logo.png'

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

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
const schema: WithContext<OnlineStore> = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: 'Nutflick',
  url: baseUrl,
  logo: baseUrl + logo.src,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'hi@nutflick.com',
    telephone: '+918437661855',
  },
}

const Home = async () => {
  const products = await getProducts()
  return (
    <>
      <h2
        className={clsx(
          headingFont.className,
          'text-4xl leading-normal md:max-w-full mb-10 md:mt-0 mt-5',
        )}
      >
        Taste the <span className="block md:inline">Nutty Goodness ✨</span>
      </h2>
      <ProductGrid products={products} />
      <SyncCart products={products} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}

export default Home
