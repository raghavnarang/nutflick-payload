'use client'

import Button from '@/components/button'
import QuantitySelectorUI from '../quantity-selector-ui'
import CartItem from '../cart-item'
import { useCartStore } from '@/features/cart/cart-store/provider'
import clsx from 'clsx'

export default function CartItemCartControls({
  cartItem,
  className,
}: {
  cartItem: CartItem
  className?: string
}) {
  const { increment, decrement, clearVariant } = useCartStore((state) => state)

  return (
    <div
      className={clsx(
        'flex items-start md:items-center justify-between md:justify-start md:gap-5',
        className,
      )}
    >
      <QuantitySelectorUI
        qty={cartItem.qty}
        onMinusClick={() => decrement(cartItem.variantId)}
        onPlusClick={() => increment(cartItem.variantId)}
      />
      <Button small isSecondary onClick={() => clearVariant(cartItem.variantId)}>
        Remove
      </Button>
    </div>
  )
}
