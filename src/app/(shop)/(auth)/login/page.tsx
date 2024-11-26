import { type FC } from 'react'
import LoginClient from './client'

interface LoginProps {
  searchParams: Promise<{
    ref?: string
  }>
}

export const metadata = {
  title: 'Login | Nutflick',
}

const Login: FC<LoginProps> = async ({ searchParams }) => {
  const { ref } = await searchParams

  return <LoginClient refPath={ref} />
}

export default Login
