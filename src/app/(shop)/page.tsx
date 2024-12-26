import ProductGrid from '@/components/product/product-grid'
import SyncCart from '@/features/cart/cart-store/sync-cart'
import { getProducts } from '@/features/server/product'
import clsx from 'clsx'
import type { OnlineStore, WithContext } from 'schema-dts'
import logo from '@/public/logo.png'
import type { Metadata } from 'next'
import { getHomePageOptions } from '@/features/server/home'
import Container from '@/components/container'
import HeroBanner from '@/components/hero'
import config from '@payload-config'
import { getPayload } from 'payload'
import ProductsBlockComponent from '@/blocks/products/component'
import type { Product } from '@/payload-types'

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!

export async function generateMetadata(): Promise<Metadata> {
  const options = await getHomePageOptions()

  return {
    title: options.meta?.title || 'Nutflick',
    description: options.meta?.description,
    openGraph: {
      url: baseUrl,
      siteName: 'Nutflick',
    },
    alternates: {
      canonical: baseUrl,
    },
  }
}

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

// const Home = async () => {
//   const products = await getProducts()
//   return (
//     <>
//       <HeroBanner />
//       <Container className="pt-12">
//         <div className='mb-12'>
//           <h2 className="mb-2 inline-block text-3xl font-extrabold leading-normal md:max-w-full bg-gradient-to-r to-orange-600 from-primary text-transparent bg-clip-text">
//             New Arrivals
//           </h2>
//           <p className="font-medium">Premium Nuts & Dry Fruits Freshly Added</p>
//         </div>

//         <ProductGrid products={products} />
//         <SyncCart products={products} />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//         />
//       </Container>
//     </>
//   )
// }

export default async function HomePage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'home-page-options', depth: 2 })
  return (
    <>
      {data.pageBlocks?.map((block, index) => {
        switch (block.blockType) {
          case 'Hero':
            return <HeroBanner {...block} product={block.product as Product} key={block.id} />
          case 'Products':
            return (
              <ProductsBlockComponent
                {...block}
                hideBorderBottom={index === (data.pageBlocks?.length || 0) - 1}
                products={block.products as Product[]}
                key={block.id}
              />
            )
          default:
            return null
        }
      })}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}
