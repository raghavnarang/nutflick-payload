"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addCartDiscountCode } from "../actions";
import { useEffect, useRef } from "react";
import FormTooltip from "../form-tooltip";

const ApplyDiscountForm = ({ toast }: { toast?: { message: string } }) => {
  const { pending } = useFormStatus();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [toast]);

  return (
    <div className="flex w-full">
      <input
        className="text-sm px-3 py-2 border border-solid border-gray-300 focus:border-gray-400 outline-none rounded-sm w-full mr-5 disabled:opacity-50"
        type="text"
        name="code"
        placeholder="Discount Code"
        required
        ref={inputRef}
        disabled={pending}
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm text-sm bg-gray-200 px-3 py-2 hover:bg-gray-300 disabled:hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        Apply
      </button>
    </div>
  );
};

const ApplyDiscount = () => {
  const [message, formAction] = useFormState(addCartDiscountCode, null);

  return (
    <form action={formAction} className="w-full flex items-center relative">
      <ApplyDiscountForm toast={message || undefined} />
      <FormTooltip value={message || undefined} className="-bottom-6" />
    </form>
  );
};

export default ApplyDiscount;
