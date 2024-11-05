'use client'

import { addAddress, editAddress } from '@/features/server/actions/address'
import { useToastStore } from '@/features/toast/store'
import { useSearchParams } from 'next/navigation'
import { type FormEventHandler, useTransition, type ReactNode, useEffect } from 'react'

export default function MyAccountAddressFormElement({
  children,
  hasAddress,
}: {
  children: ReactNode
  hasAddress: boolean
}) {
  const addToast = useToastStore((state) => state.addToast)
  const [, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const added = searchParams.get('added')

  useEffect(() => {
    if (added === 'true') {
      addToast('Address added successfully', 'success')
    }
  }, [added])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const action = hasAddress ? editAddress : addAddress
    startTransition(async () => {
      const result = await action(new FormData(e.currentTarget))
      if (result) {
        addToast(result.message, result.status)
      }
    })
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}
