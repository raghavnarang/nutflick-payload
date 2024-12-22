import Link from 'next/link'
import { Cart } from '../Icons'
import type { FC } from 'react'
import clsx from 'clsx'

interface CartNavItemUIProps {
  quantity?: number
  hideIcon?: boolean
  hideText?: boolean
  hideTextOnMobile?: boolean
  className?: string
}

const CartNavItemUI: FC<CartNavItemUIProps> = ({
  quantity = 0,
  hideIcon = false,
  hideText = false,
  hideTextOnMobile = false,
  className,
}) => (
  <Link href="/cart" className={clsx('mr-8 last:mr-0 relative flex', className)}>
    {!hideIcon && <Cart className="mr-2" />}
    {!hideText && (
      <span className={clsx('mr-2', { 'md:block hidden': hideTextOnMobile })}>Cart</span>
    )}
    <span className="text-xs size-6 bg-primary rounded-full text-white flex items-center justify-center">
      {quantity}
    </span>
  </Link>
)

export default CartNavItemUI
export type { CartNavItemUIProps }
