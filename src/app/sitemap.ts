import 'server-only'
import { getProducts } from '@/features/server/product'
import { MetadataRoute } from 'next'
import logo from '@/public/logo.png'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('09/11/2024'),
      images: [baseUrl + logo.src],
      priority: 1,
    },
  ]

  products.forEach((p) => {
    // Add products to sitemap
    sitemap.push({
      url: baseUrl + '/product/' + p.slug,
      lastModified: new Date(p.updatedAt),
      images: typeof p.image !== 'number' && p.image?.url ? [baseUrl + p.image.url] : undefined,
      priority: 1,
    })

    // Add products variants to sitemap
    p.variants?.forEach((v) => {
      if (v.slug) {
        sitemap.push({
          url: process.env.NEXT_PUBLIC_VERCEL_URL! + '/product/' + p.slug + '/' + v.slug,
          lastModified: new Date(p.updatedAt),
          images:
            typeof v.image !== 'number' && v.image?.url
              ? [baseUrl + v.image.url]
              : typeof p.image !== 'number' && p.image?.url
                ? [baseUrl + p.image.url]
                : undefined,
          priority: 1,
        })
      }
    })
  })

  // Add Static Pages
  const payload = await getPayload({ config })
  const pages = await payload.find({ collection: 'pages', pagination: false })
  pages.docs.forEach((p) =>
    sitemap.push({
      url: process.env.NEXT_PUBLIC_VERCEL_URL! + '/page/' + p.slug,
      lastModified: new Date(p.updatedAt),
      priority: 0.2,
    }),
  )

  return sitemap
}
