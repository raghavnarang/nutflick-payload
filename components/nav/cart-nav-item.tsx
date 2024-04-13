'use client'

import CartNavItemUI from "./cart-nav-item-ui";
import { useCart } from "@/features/cart";

const CartNavItem = ({ onlyIcon = false }: { onlyIcon?: boolean }) => {
  const { cart } = useCart();
  const totalQty = cart.items.reduce((total, item) => total + item.qty, 0);

  return <CartNavItemUI quantity={totalQty} onlyIcon={onlyIcon} />;
};

export default CartNavItem;
