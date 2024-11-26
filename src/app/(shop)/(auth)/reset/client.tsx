'use client'

import { type FormEventHandler, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import { useToastStore } from '@/features/toast/store'
import { useSearchParams } from 'next/navigation'
import BigMessage from '@/components/big-message'
import { Error, Tick } from '@/components/Icons'
import { resetPassword } from '@/features/server/actions/forgot'

const FormControls = () => {
  const { pending } = useFormStatus()

  return (
    <div className="flex flex-col gap-5">
      <Textbox
        type="password"
        placeholder="Enter New password"
        name="password"
        label="Password"
        required
        disabled={pending}
      />
      <Textbox
        type="password"
        placeholder="Enter password again"
        name="confirm"
        label="Confirm Password"
        required
        disabled={pending}
      />
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={pending}>
          Change Password
        </Button>
      </div>
    </div>
  )
}

const ResetPasswordClient = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [, startTransition] = useTransition()
  const addToast = useToastStore((state) => state.addToast)
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <BigMessage icon={Tick} button={{ text: 'Login', link: { href: '/login' } }}>
        Password has been changed successfully. Try to login.
      </BigMessage>
    )
  }

  if (!token) {
    return <BigMessage icon={Error}>Invalid reset password link.</BigMessage>
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await resetPassword(new FormData(e.currentTarget))
      if (result.status) {
        if (result.status === 'success') {
          setDone(true)
        } else {
          addToast(result.message || 'Something went wrong', result.status)
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl mb-5">Enter new password</h1>
      <input type="hidden" name="token" value={token} />
      <FormControls />
    </form>
  )
}

export default ResetPasswordClient
