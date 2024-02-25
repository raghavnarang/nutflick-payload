"use client";

import { login } from "@/features/server/actions/auth";
import ErrorMessage from "@/components/error-message";
import CaptchaSubmitButton from "@/components/form/captcha-submit-button";
import Link from "next/link";
import { type FC, useRef, type RefObject } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface LoginProps {
  searchParams: {
    ref?: string;
  };
}

interface FormControlsProps {
  formRef: RefObject<HTMLFormElement>;
}

const FormControls: FC<FormControlsProps> = ({ formRef }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        type="email"
        placeholder="Enter email to login"
        name="email"
        className="border-b-2 border-red-300 focus:border-red-500 py-2 block w-full outline-none disabled:opacity-50 mb-5"
        autoFocus
        required
        disabled={pending}
      />
      <CaptchaSubmitButton className="mt-5" formRef={formRef}>
        Login
      </CaptchaSubmitButton>
    </>
  );
};

const Login: FC<LoginProps> = ({ searchParams: { ref } }) => {
  const [result, action] = useFormState(login, null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={action} ref={formRef}>
      <h1 className="text-xl mb-5">Login to Nutflick</h1>
      {ref && <input type="hidden" name="ref" value={ref} />}
      <FormControls formRef={formRef} />
      {result?.message && (
        <ErrorMessage className="mt-5 w-full">{result.message}</ErrorMessage>
      )}
      <p className="text-xs mt-10">
        This site is protected by hCaptcha and its{" "}
        <Link href="https://www.hcaptcha.com/privacy" className="underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="https://www.hcaptcha.com/terms" className="underline">
          Terms of Service
        </Link>{" "}
        apply.
      </p>
    </form>
  );
};

export default Login;
