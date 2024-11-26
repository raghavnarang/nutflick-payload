import Link from 'next/link'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'
import type { Metadata } from 'next'

interface ShopErrorProps {
  searchParams: Promise<{ message?: string }>
}

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: 'Something went wrong | Nutflick'
}

const ShopError = async ({ searchParams }: ShopErrorProps) => {
  const { message } = await searchParams
  return (
    <BigMessage icon={Error} button={{ text: <Link href="/">Go to Home</Link> }}>
      {message || 'Something went wrong. Please try again later or go to home'}
    </BigMessage>
  )
}

export default ShopError
