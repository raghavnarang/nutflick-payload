import { getProducts } from '@/features/server/product'
import Product, { generateMetadata } from '../page'

export async function generateStaticParams() {
  const products = await getProducts()

  return products
    .filter((p) => p.slug && p.variants && p.variants.every((v) => !!v.slug))
    .reduce<{ productSlug: string; variantSlug: string }[]>((slugs, p) => {
      const variantItems =
        p.variants && p.variants.map((v) => ({ productSlug: p.slug!, variantSlug: v.slug! }))
      return [...slugs, ...(variantItems || [])]
    }, [])
}

export { generateMetadata }
export default Product
