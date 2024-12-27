import clsx from 'clsx'
import { ReactNode } from 'react'

export default function Badge({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors bg-white text-primary',
        className,
      )}
    >
      {children}
    </div>
  )
}
