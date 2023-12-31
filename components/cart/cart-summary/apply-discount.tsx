"use client";

import { addCartDiscountCode } from "../actions";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";

const FormContents = () => {
  const { pending } = useFormStatus();

  return (
    <div className="flex w-full">
      <input
        className="text-sm px-3 py-2 border border-solid border-gray-300 focus:border-gray-400 outline-none rounded-sm w-full mr-5 disabled:opacity-50"
        type="text"
        name="code"
        placeholder="Discount Code"
        required
        disabled={pending}
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm text-sm bg-gray-200 text-gray-700 px-3 py-2 hover:bg-gray-30æ0 disabled:hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        Apply
      </button>
    </div>
  );
};

const ApplyDiscount = () => {
  const [result, formAction] = useFormState(addCartDiscountCode, null);
  const formRef = useRef<HTMLFormElement>(null);

  const { addToast } = useToast();

  useEffect(() => {
    if (result) {
      formRef.current?.reset();
      if (result.status !== Status.success) {
        addToast({
          message: result.message,
          type: result.status,
          id: Date.now(),
          isDismissable: true,
        });
      }
    }
  }, [result]);

  return (
    <form action={formAction} ref={formRef} className="w-full flex items-center">
      <FormContents />
    </form>
  );
};

export default ApplyDiscount;
