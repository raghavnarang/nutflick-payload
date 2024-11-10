import { type FC, type ReactNode } from 'react'
import cx from 'clsx'

interface BodyProps {
  children?: ReactNode
  className?: string
}

const Body: FC<BodyProps> = ({ children, className }) => (
  <div className={cx('flex justify-center', className)}>
    <div className="container relative">{children}</div>
  </div>
)

export default Body
export type { BodyProps }
