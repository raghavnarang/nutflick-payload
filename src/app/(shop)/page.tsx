import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import ProductGrid from '@/components/product/product-grid'

export const metadata = {
  description:
    "Elevate your snacking with Nutflick - India's top destination for premium dry fruits and nuts. Shop now for a taste of excellence!",
  openGraph: {
    type: 'website',
  },
}

const Home = async () => {
  const payload = await getPayloadHMR({ config })
  const data = await payload.find({ collection: 'products', limit: 12 })
  return <ProductGrid products={data.docs} />
}

export default Home
