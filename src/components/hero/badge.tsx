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
        'inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-orange-600 text-white hover:bg-orange-700',
        className,
      )}
    >
      {children}
    </div>
  )
}
