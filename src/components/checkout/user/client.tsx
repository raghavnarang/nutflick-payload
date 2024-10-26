'use client'

import { useState } from 'react'
import CheckoutUserEmailTextbox from './email-textbox'
import CheckoutUserEmailPrefilled from './email-prefilled'

interface CheckoutUserProps {
  email?: string
  isLoggedIn?: boolean
}

enum Mode {
  DEFAULT,
  EDIT,
}

export default function CheckoutUserClient({ email, isLoggedIn = false }: CheckoutUserProps) {
  const [mode, setMode] = useState(Mode.DEFAULT)

  if ((!email && mode === Mode.DEFAULT) || (email && mode === Mode.EDIT)) {
    return (
      <CheckoutUserEmailTextbox
        email={email}
        onEditCancel={mode === Mode.EDIT ? () => setMode(Mode.DEFAULT) : undefined}
      />
    )
  }

  if (email && mode === Mode.DEFAULT) {
    return (
      <CheckoutUserEmailPrefilled
        email={email}
        onEdit={() => setMode(Mode.EDIT)}
        isLoggedIn={isLoggedIn}
      />
    )
  }
}
