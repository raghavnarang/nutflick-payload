import type { FC, ReactNode } from 'react'
import SectionHeader from './header'
import clsx from 'clsx'

interface SectionProps {
  title: string
  children?: ReactNode
  className?: string
}

const Section: FC<SectionProps> = ({ title, children, className }) => (
  <div className={clsx('bg-gray-50 rounded-lg mb-10', className)}>
    <SectionHeader title={title} />
    {children}
  </div>
)

export default Section
