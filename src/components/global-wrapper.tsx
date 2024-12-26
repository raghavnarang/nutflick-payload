import type { ReactNode } from 'react'

export default function GlobalWrapper({ children }: { children?: ReactNode }) {
  return <div className="flex flex-col justify-between min-h-screen md:pb-0">{children}</div>
}
