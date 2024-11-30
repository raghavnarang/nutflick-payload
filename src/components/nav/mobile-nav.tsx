'use client'

import { FC, useEffect, useState } from 'react'
import cx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'
import Bars from '../Icons/bars'
import Nav from './nav'
import Cross from '../Icons/cross'
import { NavProps } from './types'

const MobileNav: FC<NavProps> = ({ items }) => {
  const [isOpen, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setOpen(false)
  }, [pathname, searchParams])

  return (
    <div className="mr-5 size-8 block md:hidden">
      <button onClick={() => setOpen(true)} aria-label="Mobile Menu">
        <Bars className="!size-8" />
      </button>
      <div
        className={cx('fixed bg-white inset-0 z-20 p-10 transition-transform duration-500', {
          '-translate-x-full': !isOpen,
        })}
      >
        <button className="absolute right-8 top-8" onClick={() => setOpen(false)} aria-label="Close Mobile Menu">
          <Cross className="!size-8 text-red-600" />
        </button>
        <Nav items={items} className="flex-col !items-start gap-4" />
      </div>
    </div>
  )
}

export default MobileNav
