'use client'

import Textbox from '@/components/form/textbox'
import Section from '@/components/section'
import SectionBody from '@/components/section/body'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

interface Props {
  email?: string
  onEditCancel?: () => void
}

export default function CheckoutUserEmailTextbox({ email, onEditCancel }: Props) {
  const { pending } = useFormStatus()

  const editCancelText = (
    <p className="mt-3 text-sm text-gray-500">
      <Link
        href="#"
        className="text-red-600"
        onClick={(e) => {
          e.preventDefault()
          onEditCancel?.()
        }}
      >
        Cancel
      </Link>{' '}
      editing email or{' '}
      <Link href="/login" className="text-red-600">
        Login here
      </Link>
    </p>
  )

  const defaultText = (
    <p className="mt-3 text-sm text-gray-500">
      Already have account?{' '}
      <Link href="/login" className="text-red-600">
        Login here
      </Link>
    </p>
  )

  return (
    <Section title="Email">
      <SectionBody>
        <Textbox
          outerWrapperClassname="sm:col-span-3 col-span-1"
          placeholder="Enter Email"
          name="email"
          type="email"
          required
          disabled={pending}
          defaultValue={email}
        />
        {onEditCancel ? editCancelText : defaultText}
      </SectionBody>
    </Section>
  )
}
