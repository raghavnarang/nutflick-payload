import Link from 'next/link'
import { Cart } from '../Icons'
import type { FC } from 'react'

interface CartNavItemUIProps {
  quantity?: number
  hideIcon?: boolean
  hideText?: boolean
}

const CartNavItemUI: FC<CartNavItemUIProps> = ({
  quantity = 0,
  hideIcon = false,
  hideText = false,
}) => (
  <Link href="/cart" className="mr-8 last:mr-0 relative flex">
    {!hideIcon && <Cart className="mr-2" />}
    {!hideText && <span className="mr-2">Cart</span>}
    <span className="text-xs size-6 bg-primary rounded-full text-white flex items-center justify-center">
      {quantity}
    </span>
  </Link>
)

export default CartNavItemUI
export type { CartNavItemUIProps }
