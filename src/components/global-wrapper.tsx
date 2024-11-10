'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export default function GlobalWrapper({ children }: { children?: ReactNode }) {
  const pathname = usePathname()
  const isProductPage = pathname.includes('/product/')

  return (
    <div
      className={clsx('flex flex-col justify-between min-h-screen px-3 md:pb-0', {
        'pb-14': !isProductPage,
        'pb-28': isProductPage,
      })}
    >
      {children}
    </div>
  )
}
