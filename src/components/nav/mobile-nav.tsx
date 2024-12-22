'use client'

import { FC, useEffect, useState } from 'react'
import cx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'
import Bars from '../Icons/bars'
import type { NavItem } from './types'
import Link from 'next/link'

const MobileNav: FC<{ items: NavItem[] }> = ({ items }) => {
  const [isOpen, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setOpen(false)
  }, [pathname, searchParams])

  return (
    <div className="mr-3 size-8 block md:hidden">
      <button onClick={() => setOpen(!isOpen)} aria-label="Mobile Menu">
        <Bars className="!size-8" />
      </button>
      <div
        className={cx(
          'fixed bg-white inset-0 z-20 mt-12 transition-transform duration-500 border-t border-gray-300 flex flex-col',
          {
            '-translate-x-full': !isOpen,
          },
        )}
      >
        {items.map((item) => (
          <Link
            href={item.link}
            key={item.link}
            aria-description={item.text}
            className='px-5 py-3 border-b border-gray-300'
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
