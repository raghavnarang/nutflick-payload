'use client'

import Section from '@/components/section'
import SectionBody from '@/components/section/body'
import Link from 'next/link'

interface Props {
  email: string
  onEdit: () => void
}

export default function CheckoutUserEmailPrefilled({ email, onEdit }: Props) {
  return (
    <Section title="Email">
      <SectionBody>
        <p>{email}</p>
        <p className="mt-3 text-sm text-gray-500">
          Not you?{' '}
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
        <input type="hidden" value={email} />
      </SectionBody>
    </Section>
  )
}
