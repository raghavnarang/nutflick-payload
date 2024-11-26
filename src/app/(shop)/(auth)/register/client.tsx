'use client'

import { type FormEventHandler, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import Link from 'next/link'
import { useToastStore } from '@/features/toast/store'
import BigMessage from '@/components/big-message'
import { Tick } from '@/components/Icons'
import { register } from '@/features/server/actions/register'

const FormControls = () => {
  const { pending } = useFormStatus()
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(false)

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
      <Textbox
        type="password"
        placeholder="Enter password"
        name="password"
        label="Password"
        required
        disabled={pending}
        value={pass}
        inputWrapperClassName={error ? 'border-red-600' : ''}
        onChange={(e) => {
          setPass(e.target.value)
          setError(false)
        }}
      />
      <div>
        <Textbox
          type="password"
          placeholder="Enter password again"
          name="confirm"
          label="Confirm Password"
          required
          disabled={pending}
          value={confirm}
          inputWrapperClassName={error ? 'border-red-600' : ''}
          onChange={(e) => {
            setConfirm(e.target.value)
            setError(false)
          }}
        />
        {error && <p className="text-sm text-red-600 mt-2">Passwords must be same</p>}
      </div>
      <div className="flex items-center justify-between mt-2">
        <Button
          type="submit"
          disabled={pending}
          onClick={(e) => {
            if (confirm != pass) {
              e.preventDefault()
              setError(true)
            }
          }}
        >
          Register
        </Button>
        <p className="text-gray-500 text-sm text-right">
          Already have an account?
          <br />
          <Link href="/login" className="text-red-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

const RegisterClient = () => {
  const [, startTransition] = useTransition()
  const addToast = useToastStore((state) => state.addToast)
  const [sent, setSent] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await register(new FormData(e.currentTarget))
      if (result.status) {
        if (result.status === 'success') {
          setSent(true)
        } else {
          addToast(result.message || 'Something went wrong', result.status)
        }
      }
    })
  }

  if (sent) {
    return (
      <BigMessage icon={Tick}>
        A verification email has been sent to your inbox. Click link in email to verify your account
      </BigMessage>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl mb-5">Create Account</h1>
      <FormControls />
    </form>
  )
}

export default RegisterClient
