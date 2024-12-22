import { useCartStore } from '@/features/cart/cart-store/provider'
import { useCartVariantSelectorStore } from '@/features/cart/variant-selector-store/store'
import { Product } from '@/payload-types'

export default function useAddToCart(product: Product) {
  const {
    cart,
    increment: incrementAction,
    decrement: decrementAction,
    clear: clearAction,
  } = useCartStore((state) => state)
  const setVariantSelectorProduct = useCartVariantSelectorStore((state) => state.setProduct)

  const productVariantInCart = cart.items.find(
    (ci) => ci.productId === product.id && product.variants?.find((v) => v.id === ci.variantId),
  )

  const addToCartClickHandler = () => {
    if (product.variants && product.variants.length === 1 && product.variants?.[0].id) {
      incrementAction(product.variants[0].id, product)
    } else {
      setVariantSelectorProduct(product)
    }
  }

  const cartVariants = cart.items.filter(
    (item) =>
      item.productId === product.id && product.variants?.find((v) => v.id === item.variantId),
  )
  const qty = cartVariants.reduce((total, item) => total + item.qty, 0)
  const cartHasSingleVariant = cartVariants.length === 1
  const productHasSingleVariant = product.variants && product.variants.length === 1

  const decrement = () =>
    cartHasSingleVariant
      ? decrementAction(cartVariants[0].variantId)
      : setVariantSelectorProduct(product)

  const increment = () =>
    productHasSingleVariant && product.variants?.[0].id
      ? incrementAction(product.variants[0].id, product)
      : setVariantSelectorProduct(product)

  const clear = () => clearAction(product)

  return {
    inCart: !!productVariantInCart,
    addToCart: addToCartClickHandler,
    qty,
    increment,
    decrement,
    clear,
  }
}
