'use client'

import Button from '@/components/button'
import { deleteAddress } from '@/features/server/actions/address'
import { useToastStore } from '@/features/toast/store'
import { useTransition } from 'react'

export default function DeleteAddress({ id }: { id: number }) {
  const addToast = useToastStore((state) => state.addToast)
  const [pending, startTransition] = useTransition()

  return (
    <Button
      small
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const result = await deleteAddress(id)
          addToast(result.message, result.status)
        })
      }}
    >
      Delete
    </Button>
  )
}
