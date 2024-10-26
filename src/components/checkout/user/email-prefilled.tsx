'use client'

import Link from 'next/link'

interface Props {
  email: string
  onEdit?: () => void
  isLoggedIn?: boolean
}

export default function CheckoutUserEmailPrefilled({ email, onEdit, isLoggedIn }: Props) {
  const nonLoggedInText = (
    <p className="mt-3 text-sm text-gray-500">
      Not your email?{' '}
      <Link
        href="#"
        className="text-red-600"
        onClick={(e) => {
          e.preventDefault()
          onEdit?.()
        }}
      >
        Edit email
      </Link>{' '}
      or{' '}
      <Link href="/login" className="text-red-600">
        Login here
      </Link>
    </p>
  )

  const loggedInText = (
    <p className="mt-3 text-sm text-gray-500">
      Not You?{' '}
      <Link href="/logout?ref=/checkout" className="text-red-600">
        Logout
      </Link>
    </p>
  )

  return (
    <>
      <p>{email}</p>
      {isLoggedIn ? loggedInText : nonLoggedInText}
      <input type="hidden" value={email} name="email" />
    </>
  )
}
