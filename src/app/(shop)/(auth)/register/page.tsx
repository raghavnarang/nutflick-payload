'use client'

import { useState, type FC } from 'react'
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

const Login: FC<LoginProps> = ({ searchParams: { ref } }) => {
  // const [result, action] = useFormState(register, null)

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      
    }}>
      <h1 className="text-xl mb-5">Create Account</h1>
      {ref && <input type="hidden" name="ref" value={ref} />}
      <FormControls />
    </form>
  )
}

export default Login
