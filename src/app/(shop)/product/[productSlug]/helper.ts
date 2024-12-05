import { getProductBySlug } from '@/features/server/product'

export interface ProductProps {
  params: Promise<{ productSlug: string; variantSlug?: string }>
  searchParams: Promise<{ size?: string }>
}

export async function getProductDataFromParams({ params, searchParams }: ProductProps) {
  const { productSlug } = await params
  const { size: variantSlug } = (await searchParams) || {}
  const product = await getProductBySlug(productSlug)

  if (!product || product?.variants?.length === 0) {
    return false
  }

  const variant =
    (variantSlug &&
      product.variants?.find(
        (variant) => variant.slug?.toLowerCase() === variantSlug.toLowerCase(),
      )) ||
    product.variants![0]

  return { product, variant }
}
