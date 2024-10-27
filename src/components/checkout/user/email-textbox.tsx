'use client'

import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

interface Props {
  email?: string
  onCancel?: () => void
}

export default function CheckoutUserEmailTextbox({ email, onCancel }: Props) {
  const { pending } = useFormStatus()

  const cancelText = (
    <p className="mt-3 text-sm text-gray-500">
      <Button
        small
        isSecondary
        className="inline-flex"
        type="button"
        onClick={() => {
          onCancel?.()
        }}
      >
        Go Back
      </Button>{' '}
      or{' '}
      <Link href="/login?ref=/checkout">
        <Button small className="inline-flex" type="button">
          Login here
        </Button>
      </Link>
    </p>
  )

  const defaultText = (
    <p className="mt-3 text-sm text-gray-500">
      Already have account?{' '}
      <Link href="/login?ref=/checkout">
        <Button small className="inline-flex" type="button">
          Login here
        </Button>
      </Link>
    </p>
  )

  return (
    <>
      <Textbox
        outerWrapperClassname="sm:col-span-3 col-span-1"
        placeholder="Enter Email"
        name="email"
        type="email"
        required
        disabled={pending}
        defaultValue={email}
      />
      {onCancel ? cancelText : defaultText}
    </>
  )
}
