import Body from '@/components/body'
import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => (
  <Body>
    <div className="w-full flex justify-center">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  </Body>
)

export default AuthLayout
