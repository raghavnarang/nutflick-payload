import { redirectIfAuthenticated } from '@/features/server/auth/me'
import type { Metadata } from 'next'
import type { FC } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  await redirectIfAuthenticated()
  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}

export default AuthLayout
