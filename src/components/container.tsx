import { type FC, type ReactNode } from 'react'
import cx from 'clsx'

interface ContainerProps {
  children?: ReactNode
  className?: string
}

const Container: FC<ContainerProps> = ({ children, className }) => (
  <div className={cx('flex justify-center xl:px-0 px-3', className)}>
    <div className="container relative">{children}</div>
  </div>
)

export default Container
export type { ContainerProps }
