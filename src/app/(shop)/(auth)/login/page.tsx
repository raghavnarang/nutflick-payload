'use client'

import { type FC } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Button from '@/components/button'
import Textbox from '@/components/form/textbox'
import Link from 'next/link'

interface LoginProps {
  searchParams: {
    ref?: string
  }
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
        <Link href="/forgot-password" className="text-red-600 text-sm mt-2 block">
          Forgot Password?
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={pending}>
          Login
        </Button>
        <p className="text-gray-500 text-sm text-right">
          Don't have an account?
          <br />
          <Link href="/register" className="text-red-600">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}

const Login: FC<LoginProps> = ({ searchParams: { ref } }) => {
  // const [result, action] = useFormState(login, null)

  return (
    <form>
      <h1 className="text-xl mb-5">Login to Nutflick</h1>
      {ref && <input type="hidden" name="ref" value={ref} />}
      <FormControls />
    </form>
  )
}

export default Login
