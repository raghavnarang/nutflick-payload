'use client'

import { type FC } from 'react'
import { useCartStore } from '@/features/cart/cart-store/provider'
import type { Product } from '@/payload-types'
import { useCartVariantSelectorStore } from '@/features/cart/variant-selector-store/store'
import EditCartItemUI from './edit-cart-item-ui'

interface EditCartItemProps {
  product: Product
  className?: string
  bigButton?: boolean
}

const EditCartItem: FC<EditCartItemProps> = ({ product, ...rest }) => {
  const { cart, increment, decrement, clear } = useCartStore((state) => state)
  const setVariantSelectorProduct = useCartVariantSelectorStore((state) => state.setProduct)

  const cartVariants = cart.items.filter(
    (item) =>
      item.productId === product.id && product.variants?.find((v) => v.id === item.variantId),
  )
  const qty = cartVariants.reduce((total, item) => total + item.qty, 0)
  const cartHasSingleVariant = cartVariants.length === 1
  const productHasSingleVariant = product.variants && product.variants.length === 1

  return (
    <EditCartItemUI
      {...rest}
      qty={qty}
      onMinusClick={() =>
        cartHasSingleVariant
          ? decrement(cartVariants[0].variantId)
          : setVariantSelectorProduct(product)
      }
      onPlusClick={() =>
        productHasSingleVariant && product.variants?.[0].id
          ? increment(product.variants[0].id, product)
          : setVariantSelectorProduct(product)
      }
      onRemoveClick={() => clear(product)}
    />
  )
}

export default EditCartItem
