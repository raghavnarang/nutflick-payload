'use client'

import { useCartStore } from '@/features/cart/cart-store/provider'
import CartNavItemUI from './cart-nav-item-ui'

const CartNavItem = ({ onlyIcon = false }: { onlyIcon?: boolean }) => {
  const cart = useCartStore((state) => state.cart)
  const totalQty = cart.items.reduce((total, item) => total + item.qty, 0);

  return <CartNavItemUI quantity={totalQty} onlyIcon={onlyIcon} />
}

export default CartNavItem
