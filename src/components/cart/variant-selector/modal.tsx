'use client'

import { useCartVariantSelectorStore } from '@/features/cart/variant-selector-store/store'
import { Modal } from '../../modal'
import VariantSelectorRow from './row'
import QuickActionsContainer from '@/components/quick-actions/container'
import CartQuickAction from '@/components/quick-actions/cart'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const VariantSelectorModal = () => {
  const { product, setProduct } = useCartVariantSelectorStore((state) => state)

  const pathname = usePathname()
  useEffect(() => {
    setProduct(undefined)
  }, [pathname])

  if (!product) {
    return null
  }

  const quickActions = (
    <QuickActionsContainer columns={2}>
      <div
        className="border-solid border-r border-gray-300 h-14 flex items-center justify-center px-4 cursor-pointer"
        onClick={() => setProduct(undefined)}
      >
        Close
      </div>
      <CartQuickAction />
    </QuickActionsContainer>
  )

  return (
    <Modal
      title={`${product.variants?.length || 'Mutiple'} options available`}
      close={() => setProduct(undefined)}
      footer={quickActions}
    >
      {product.variants?.map((variant, i) => (
        <VariantSelectorRow variant={variant} product={product} key={i} />
      ))}
    </Modal>
  )
}

export default VariantSelectorModal
