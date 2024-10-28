import type { FC } from 'react'
import cx from 'clsx'
import { Icon } from './types'

const ChevronRight: FC<Icon> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={cx('w-6 h-6', className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
)

export default ChevronRight
