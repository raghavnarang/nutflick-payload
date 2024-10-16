'use client'

import Button from '../button'
import { useFormStatus } from 'react-dom'

const CheckoutPaymentButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} large type='submit'>
      Place Order
    </Button>
  )
}

export default CheckoutPaymentButton
