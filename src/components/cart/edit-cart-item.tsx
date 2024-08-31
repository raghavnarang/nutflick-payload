'use client'

import { type FC } from 'react'
import { useCartStore } from '@/features/cart/cart-store/provider'
import type { CartItem } from '@/shared/types/cart'
import EditCartItemUI from './edit-cart-item-ui'

interface EditCartItemProps {
  cartItem: CartItem
  className?: string
  bigButton?: boolean
}

const EditCartItem: FC<EditCartItemProps> = ({ cartItem, ...rest }) => {
  const { increment, decrement, clearVariant } = useCartStore((state) => state)

  return (
    <EditCartItemUI
      {...rest}
      qty={cartItem.qty}
      onMinusClick={() => decrement(cartItem.variantId)}
      onPlusClick={() => increment(cartItem.variantId)}
      onRemoveClick={() => clearVariant(cartItem.variantId)}
    />
  )
}

export default EditCartItem
