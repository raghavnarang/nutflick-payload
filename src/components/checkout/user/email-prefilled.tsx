'use client'

import Button from '@/components/button'
import Link from 'next/link'

interface Props {
  email: string
  onNewEmail?: () => void
  isLoggedIn?: boolean
}

export default function CheckoutUserEmailPrefilled({ email, onNewEmail, isLoggedIn }: Props) {
  const nonLoggedInText = (
    <p className="mt-3 text-sm text-gray-500">
      Not your email?{' '}
      <Button
        small
        isSecondary
        className="inline-flex"
        type="button"
        onClick={() => {
          onNewEmail?.()
        }}
      >
        Enter new email
      </Button>{' '}
      or{' '}
      <Link href="/login?ref=/checkout">
        <Button small className="inline-flex" type="button">
          Login here
        </Button>
      </Link>
    </p>
  )

  const loggedInText = (
    <p className="mt-3 text-sm text-gray-500">
      Not You?{' '}
      <Link href="/logout">
        <Button small isSecondary className="inline-flex" type="button">
          Logout
        </Button>
      </Link>
    </p>
  )

  return (
    <>
      <p>{email}</p>
      {isLoggedIn ? loggedInText : nonLoggedInText}
    </>
  )
}
