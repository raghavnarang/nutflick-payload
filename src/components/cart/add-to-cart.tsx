'use client'

import { type FC } from 'react'
import cx from 'clsx'
import Cart from '../Icons/cart'
import Button from '../button'
import { Product } from '@/payload-types'
import { useCartStore } from '@/features/cart/cart-store/provider'
import EditCartItem from './edit-cart-item-with-product'
import { useCartVariantSelectorStore } from '@/features/cart/variant-selector-store/store'

export interface AddToCartProps {
  product: Product
  showIcon?: boolean
  bigButton?: boolean
}

const AddToCart: FC<AddToCartProps> = ({ product, bigButton, showIcon }) => {
  const { cart, increment } = useCartStore((state) => state)
  const setVariantSelectorProduct = useCartVariantSelectorStore((state) => state.setProduct)

  if (!product.variants || product.variants.length === 0) {
    return null
  }

  const optionsLabel = product.variants.length > 1 && (
    <p className="text-xs text-gray-600 mt-1">{product.variants.length} options</p>
  )

  const areProductVariantsInCart = cart.items.find(
    (ci) => ci.productId === product.id && product.variants?.find((v) => v.id === ci.variantId),
  )
  if (areProductVariantsInCart) {
    return (
      <div>
        {bigButton && <p className="text-lg mb-3">Quantity (in cart)</p>}
        <EditCartItem
          product={product}
          className={cx({ '!flex-row': !bigButton })}
          bigButton={bigButton}
        />
        {optionsLabel}
      </div>
    )
  }

  const addToCartClickHandler = () => {
    if (product.variants && product.variants.length === 1 && product.variants?.[0].id) {
      increment(product.variants[0].id, product)
    } else {
      setVariantSelectorProduct(product)
    }
  }

  return (
    <div>
      <Button
        className={cx({ 'xl:w-1/2': bigButton })}
        icon={showIcon ? Cart : undefined}
        large={bigButton}
        small={!bigButton}
        onClick={addToCartClickHandler}
      >
        Add to Cart
      </Button>
      {optionsLabel}
    </div>
  )
}

export default AddToCart
