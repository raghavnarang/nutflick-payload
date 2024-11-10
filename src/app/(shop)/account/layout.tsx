import type { ReactNode } from 'react'

export default function AccountLayout({ children }: { children?: ReactNode }) {
  return <div className="mt-5">{children}</div>
}
