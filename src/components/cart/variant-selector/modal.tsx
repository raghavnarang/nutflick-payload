'use client'

import { useCartVariantSelectorStore } from '@/features/cart/variant-selector-store/store'
import { Modal } from '../../modal'
import VariantSelectorRow from './row'

const VariantSelectorModal = () => {
  const { product, setProduct } = useCartVariantSelectorStore((state) => state)
  if (!product) {
    return null
  }

  return (
    <Modal title={product.title} close={() => setProduct(undefined)}>
      {product.variants?.map((variant, i) => (
        <VariantSelectorRow variant={variant} product={product} key={i} />
      ))}
    </Modal>
  )
}

export default VariantSelectorModal
