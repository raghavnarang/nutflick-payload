'use client'

import Link from 'next/link'
import BigMessage from '@/components/big-message'
import { Error } from '@/components/Icons'

const ShopError = ({ reset }: { reset: () => void }) => (
  <BigMessage
    icon={Error}
    button={{ text: 'Retry', onClick: reset }}
    secondaryButton={{ text: <Link href="/">Go to Home</Link> }}
  >
    Something went wrong. Please try again later.
  </BigMessage>
)

export default ShopError
