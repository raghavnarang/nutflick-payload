'use client'

import { useState } from 'react'
import CheckoutUserEmailTextbox from './email-textbox'
import CheckoutUserEmailPrefilled from './email-prefilled'
import { GuestEmailMode } from '@/features/checkout/store'
import { useCheckoutStore } from '@/features/checkout/provider-client'

interface CheckoutUserProps {
  email?: string
  isLoggedIn?: boolean
}

export default function CheckoutUserClient({ email, isLoggedIn = false }: CheckoutUserProps) {
  const { guestEmailMode: mode, setGuestEmailMode: setMode } = useCheckoutStore((state) => state)

  if (email && mode === GuestEmailMode.DEFAULT) {
    return (
      <CheckoutUserEmailPrefilled
        email={email}
        onNewEmail={() => setMode(GuestEmailMode.NEW)}
        isLoggedIn={isLoggedIn}
      />
    )
  }

  return (
    <CheckoutUserEmailTextbox
      onCancel={mode === GuestEmailMode.NEW ? () => setMode(GuestEmailMode.DEFAULT) : undefined}
    />
  )
}
