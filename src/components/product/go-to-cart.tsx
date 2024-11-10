'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import { Product } from '@/payload-types'
import clsx from 'clsx'
import Link from 'next/link'
import Button from '../button'

export interface GoToCartProps {
  product?: Product
  variantId?: string
  className?: string
}

export default function GoToCart({ product, variantId, className }: GoToCartProps) {
  const cart = useCartStore((state) => state.cart)

  const ret = (
    <Link className={clsx(className)} href="/cart">
      <Button small isInfo>
        Go to Cart
      </Button>
    </Link>
  )

  if (variantId && cart.items.find((ci) => variantId === ci.variantId)) {
    return ret
  }

  const areProductVariantsInCart =
    product &&
    cart.items.find(
      (ci) => ci.productId === product.id && product.variants?.find((v) => v.id === ci.variantId),
    )

  return areProductVariantsInCart && ret
}
