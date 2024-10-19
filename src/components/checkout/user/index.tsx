import Textbox from '@/components/form/textbox'
import Section from '@/components/section'
import SectionBody from '@/components/section/body'
import Link from 'next/link'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import CheckoutUserEmailTextbox from './email-textbox'
import CheckoutUserEmailPrefilled from './email-prefilled'

interface CheckoutUserProps {
  email?: string
}

enum Mode {
  DEFAULT,
  EDIT,
}

export default function CheckoutUser({ email }: CheckoutUserProps) {
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
    return <CheckoutUserEmailPrefilled email={email} onEdit={() => setMode(Mode.EDIT)} />
  }
}
