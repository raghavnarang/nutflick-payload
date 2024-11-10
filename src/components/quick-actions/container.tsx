import clsx from 'clsx'
import type { ReactNode } from 'react'

interface ContainerProps {
  className?: string
  columns?: number
  children?: ReactNode
}

export default function QuickActionsContainer({ className, columns, children }: ContainerProps) {
  return (
    <div
      className={clsx(
        `border-t h-14 border-solid border-gray-300 bg-white grid`,
        {
          'grid-cols-2': columns === 2,
          'grid-cols-3': !columns || columns === 3,
          'grid-cols-4': columns === 4,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
