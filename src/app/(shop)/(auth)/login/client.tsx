'use client'

import { type FC, type FormEventHandler, use, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import Link from 'next/link'
import { useToastStore } from '@/features/toast/store'
import login from '@/features/server/actions/login'

interface LoginProps {
  refPath?: string
}

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
      <div>
        <Textbox
          type="password"
          placeholder="Enter password"
          name="password"
          label="Password"
          required
          disabled={pending}
        />
        <Link href="/forgot" className="text-red-600 text-sm mt-2 block">
          Forgot Password?
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={pending}>
          Login
        </Button>
        <p className="text-gray-500 text-sm text-right">
          Don&apos;t have an account?
          <br />
          <Link href="/register" className="text-red-600">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}

const LoginClient: FC<LoginProps> = ({ refPath }) => {
  const [, startTransition] = useTransition()
  const addToast = useToastStore((state) => state.addToast)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await login(new FormData(e.currentTarget))
      if (result.message) addToast(result.message, result.status)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl mb-5">Login to Nutflick</h1>
      {refPath && <input type="hidden" name="ref" value={refPath} />}
      <FormControls />
    </form>
  )
}

export default LoginClient
