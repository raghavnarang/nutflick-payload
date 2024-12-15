import type { Product } from '@/payload-types'
import { getProductRange } from '@/utils/misc'
import { getProductVariantTitle } from '@/utils/product'
import type { ProductGroup, WithContext } from 'schema-dts'

export default function getSchema(product: Product): WithContext<ProductGroup> {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
  const productImage =
    typeof product.image !== 'number'
      ? product.image.sizes?.optimised?.url || product.image.url || undefined
      : undefined
  const productBigImage =
    typeof product.bigImage !== 'number'
      ? product.bigImage?.sizes?.optimised?.url || product.bigImage?.url || undefined
      : undefined

  const finalProductImage = productImage || productBigImage

  const { lowPrice, highPrice } = getProductRange(product)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: product.title,
    image: finalProductImage && `${baseUrl}${finalProductImage}`,
    description: product.meta?.description || '',
    brand: {
      '@type': 'Brand',
      name: 'Nutflick',
    },
    productGroupID: `${product.id}`,
    url: `${baseUrl}/product/${product.slug}`,
    offers:
      (product.variants?.length || 0) > 1
        ? {
            '@type': 'AggregateOffer',
            url: `${baseUrl}/product/${product.slug}`,
            offerCount: product.variants?.length,
            lowPrice,
            highPrice,
            availability: 'https://schema.org/InStock',
          }
        : undefined,
    variesBy: 'https://schema.org/size',
    hasVariant: product.variants?.map((v) => {
      const variantImage =
        typeof v.image !== 'number'
          ? v.image?.sizes?.optimised?.url || v.image?.url || undefined
          : undefined
      const variantBigImage =
        typeof v.bigImage !== 'number'
          ? v.bigImage?.sizes?.optimised?.url || v.bigImage?.url || undefined
          : undefined

      const finalVariantImage = variantImage || variantBigImage || productImage || productBigImage

      return {
        '@type': 'Product',
        name: getProductVariantTitle(product, v),
        image: finalVariantImage && `${baseUrl}${finalVariantImage}`,
        productID: v.id || undefined,
        size: v.title,
        offers: {
          '@type': 'Offer',
          url: `${baseUrl}/product/${product.slug}?size=${v.slug}`,
          price: v.price.toFixed(2),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          hasMerchantReturnPolicy: {
            '@context': 'https://schema.org',
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnLink: `${baseUrl}/page/refund-and-cancellation-policy`,
          },
        },
      }
    }),
  }
}
