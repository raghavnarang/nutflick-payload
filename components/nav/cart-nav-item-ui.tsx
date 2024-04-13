import Link from "next/link";
import { Cart } from "../Icons";
import type { FC } from "react";

interface CartNavItemUIProps {
  quantity?: number;
  onlyIcon?: boolean;
}

const CartNavItemUI: FC<CartNavItemUIProps> = ({
  quantity = 0,
  onlyIcon = false,
}) => (
  <Link href="/cart" className="mr-8 last:mr-0 relative flex">
    <Cart className="mr-2" />
    {!onlyIcon && <span className="mr-2">Cart</span>}
    <span className="text-xs size-6 bg-red-500 rounded-full text-white flex items-center justify-center">
      {quantity}
    </span>
  </Link>
);

export default CartNavItemUI;
export type { CartNavItemUIProps };
