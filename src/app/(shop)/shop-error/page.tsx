import Link from 'next/link'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'

interface ShopErrorProps {
  searchParams: Promise<{ message?: string }>
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
