import Container from '@/components/container'
import clsx from 'clsx'
import type { ReactNode } from 'react'

interface BlockSectionProps {
  title: string
  subtitle: string
  children?: ReactNode
  className?: string
}

export default async function BlockSection({
  children,
  title,
  subtitle,
  className,
}: BlockSectionProps) {
  return (
    <Container className={clsx('md:py-12 py-7 border-b border-gray-300', className)}>
      <div className="mb-12 text-center">
        <h2 className="md:mb-2 mb-1 inline-block md:text-4xl text-3xl font-extrabold leading-normal md:max-w-full bg-gradient-to-r to-orange-600 from-primary text-transparent bg-clip-text">
          {title}
        </h2>
        <p className="font-medium md:text-base text-sm">{subtitle}</p>
      </div>

      {children}
    </Container>
  )
}
