"use client";

import Cross from "@/components/Icons/cross";
import { useEffect, type FC } from "react";
import cx from "classnames";
import { removeCartDiscountCode } from "../actions";
import useToastWithServerPromise from "@/features/toast/hooks/use-toast-with-server-promise";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";

interface DiscountTagProps {
  code: string;
}

const FormSubmit: FC<DiscountTagProps> = ({ code }) => {
  const { pending } = useFormStatus();

  return (
    <div
      className={cx("text-xs flex items-center bg-gray-200 rounded-full pl-1", {
        "opacity-50": pending,
      })}
    >
      <span className="px-1">{code.toUpperCase()}</span>
      <button type="submit" disabled={pending}>
        <Cross className="text-gray-500 hover:text-gray-600" />
      </button>
    </div>
  );
};

const DiscountTag: FC<DiscountTagProps> = ({ code }) => {
  const [result, action] = useFormState(removeCartDiscountCode, null);
  const actionWithCode = action.bind(null, code);

  const { addToast } = useToast();

  useEffect(() => {
    if (result && result.status !== Status.success) {
      addToast({
        message: result.message,
        type: result.status,
        id: Date.now(),
        isDismissable: true,
      });
    }
  }, [result]);

  return (
    <form className="relative" action={actionWithCode}>
      <FormSubmit code={code} />
    </form>
  );
};

export default DiscountTag;
