'use client'

import BigMessage from '@/components/big-message'
import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import { Tick } from '@/components/Icons'
import { forgotPassword } from '@/features/server/actions/forgot'
import { useToastStore } from '@/features/toast/store'
import { type FormEventHandler, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'

const FormControls = () => {
  const { pending } = useFormStatus()

  return (
    <div className="flex flex-col gap-5">
      <Textbox
        type="email"
        placeholder="Enter email"
        name="email"
        label="Email"
        autoFocus
        required
        disabled={pending}
      />
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={pending}>
          Send Reset Password Email
        </Button>
      </div>
    </div>
  )
}

export default function ForgotPasswordClient() {
  const [, startTransition] = useTransition()
  const addToast = useToastStore((state) => state.addToast)
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <BigMessage icon={Tick}>
        A reset password email has been sent to your inbox. Click link in email to reset your password
      </BigMessage>
    )
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await forgotPassword(new FormData(e.currentTarget))
      if (result.status) {
        if (result.status === 'success') {
          setSent(true)
        } else {
          addToast(result.message || 'Something went wrong', result.status)
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl mb-5">Forgot Password</h1>
      <FormControls />
    </form>
  )
}
