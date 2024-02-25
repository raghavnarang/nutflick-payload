"use client";

import Button from "@/components/button";
import ErrorMessage from "@/components/error-message";
import { useRouter } from "next/navigation";
import { useRef, type FC, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { verifyOtp } from "@/features/server/actions/auth";

interface VerifyRequestProps {
  searchParams: {
    email?: string;
    ref?: string;
  };
}

const FormControls = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        className="border-b-2 border-red-300 focus:border-red-500 py-2 block w-full outline-none disabled:opacity-50 mb-5"
        type="number"
        maxLength={6}
        name="otp"
        disabled={pending}
        required
        autoFocus
      />
      <Button className="mt-5" disabled={pending} type="submit">
        Verify OTP
      </Button>
    </>
  );
};

const VerifyRequest: FC<VerifyRequestProps> = ({
  searchParams: { email, ref },
}) => {
  const [result, action] = useFormState(verifyOtp, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email]);

  if (!email) {
    return <ErrorMessage>Try to login first</ErrorMessage>;
  }

  return (
    <form ref={formRef} action={action}>
      <h1 className="text-xl mb-5">Enter OTP</h1>
      <p>An OTP has been sent your inbox.</p>
      {ref && <input type="hidden" name="ref" value={ref} />}
      <input type="hidden" name="email" value={email} />
      <FormControls />
      {result?.message && (
        <ErrorMessage className="mt-5 w-full">{result.message}</ErrorMessage>
      )}
    </form>
  );
};

export default VerifyRequest;
