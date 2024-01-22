"use client";

import { login } from "@/auth/actions";
import Button from "@/components/button";
import ErrorMessage from "@/components/error-message";
import type { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface LoginProps {
  searchParams: {
    callbackUrl?: string;
  };
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <input
        type="email"
        placeholder="Enter email to login"
        name="email"
        className="border-b-2 border-red-300 focus:border-red-500 py-2 block w-full outline-none disabled:opacity-50"
        autoFocus
        required
        disabled={pending}
      />
      <Button type="submit" className="mt-10" disabled={pending}>
        Login
      </Button>
    </div>
  );
};

const Login: FC<LoginProps> = async ({ searchParams: { callbackUrl } }) => {
  const [result, action] = useFormState(login, null);

  return (
    <form action={action}>
      <h1 className="text-xl mb-5">Login to Nutflick</h1>
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}
      <SubmitButton />
      {result?.message && (
        <ErrorMessage className="mt-5 w-full">{result.message}</ErrorMessage>
      )}
    </form>
  );
};

export default Login;
