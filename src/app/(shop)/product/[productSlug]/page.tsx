import { type FC } from 'react'
import Image from 'next/image'
import ProductRecommendations from '@/components/product/product-recommendations'
import Photo from '@/components/Icons/photo'
import { getProducts } from '@/features/server/product'
import getSchema from './schema'
import type { Metadata } from 'next'
import { getProductDataFromParams, type ProductProps } from './helper'
import LexicalView from '@/components/lexical-view'
import { notFound } from 'next/navigation'
import ProductVariantNavigator from '@/components/product/variant-navigator'
import Container from '@/components/container'
import PixelViewContent from './pixel'

export async function generateMetadata(props: ProductProps): Promise<Metadata> {
  const data = await getProductDataFromParams(props)
  if (!data) {
    return {}
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
  const fallbackTitle = `Buy ${data.product.title} Online | Nutflick - Premium Quality`
  return {
    title: data.product.meta?.title || fallbackTitle,
    description: data.product.meta?.description,
    openGraph: {
      url: `${baseUrl}/product/${data.product.slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/product/${data.product.slug}`,
    },
  }
}

const Product: FC<ProductProps> = async (props) => {
  const data = await getProductDataFromParams(props)
  if (!data) {
    notFound()
  }

  const { product, variant } = data
  const image = variant.bigImage || product.bigImage || variant.image || product.image

  return (
    <Container className="md:pt-10">
      <div className="w-full flex md:gap-10 gap-4 flex-col md:flex-row items-start">
        <div className="w-full md:w-1/2 md:h-[80vh] h-[50vh] flex justify-center bg-gray-100 relative">
          {typeof image != 'number' && image && image.url ? (
            <Image
              src={image.url}
              fill
              priority
              quality={50}
              alt={image.alt || `${product.title} - ${variant.title}`}
              className="object-contain rounded-lg z-0 p-10"
              sizes="(max-width: 767px) 80vw, 40vw"
            />
          ) : (
            <div className="w-full bg-gray-200 rounded-lg h-full flex justify-center items-center">
              <Photo className="!size-10 text-gray-400" />
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="md:text-3xl text-lg mb-2 !leading-relaxed">{product.title}</h1>
          <ProductVariantNavigator className="mb-2" product={product} />
          {product.description_html && (
            <div>
              <p className="md:text-lg font-medium mb-3">Product Description</p>
              <LexicalView
                className="text-gray-700 mb-5 leading-loose"
                htmlString={product.description_html}
              />
            </div>
          )}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema(product)) }}
        />
      </div>
      {product.category?.value && (
        <ProductRecommendations
          categoryId={
            typeof product.category.value == 'number'
              ? product.category.value
              : product.category.value.id
          }
          productId={product.id}
        />
      )}
      <PixelViewContent product={product} />
    </Container>
  )
}

export default Product

export async function generateStaticParams() {
  const products = await getProducts(true)

  return products.map((p) => ({ productSlug: p.slug }))
}
