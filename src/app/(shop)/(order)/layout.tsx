import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
}

export default function OrderLayout({ children }: { children: ReactNode }) {
  return <div className="md:mt-0 mt-5 px-3 md:px-0">{children}</div>
}
