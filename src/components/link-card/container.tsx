import type { ReactNode } from 'react'

export default function LinkCardContainer({ children }: { children?: ReactNode }) {
  return <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5 w-full">{children}</div>
}
