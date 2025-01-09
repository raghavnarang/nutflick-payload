import type { OnlineStore, WithContext } from 'schema-dts'
import logo from '@/public/logo.png'
import type { Metadata } from 'next'
import { getHomePageOptions } from '@/features/server/home'
import HeroBanner from '@/components/hero'
import ProductsBlockComponent from '@/blocks/products/component'
import type { Product } from '@/payload-types'
import SyncCart from '@/features/cart/cart-store/sync-cart'

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
    telephone: '+917340803995',
  },
}

export default async function HomePage() {
  const data = await getHomePageOptions()
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
          case 'SyncCart':
            return <SyncCart key={block.id} />
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
