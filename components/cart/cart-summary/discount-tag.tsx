"use client";

import Cross from "@/components/Icons/cross";
import type { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import cx from "classnames";
import { removeCartDiscountCode } from "../actions";
import FormTooltip from "../form-tooltip";
import Tooltip from "@/components/tooltip";

interface DiscountTagProps {
  code: string;
}

const DiscountTagForm = ({ code }: { code: string }) => {
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
  const [message, formAction] = useFormState(removeCartDiscountCode, null);
  return (
    <form action={formAction} className="relative">
      <input type="hidden" value={code} name="code" />
      <DiscountTagForm code={code} />
      <FormTooltip
        className="-bottom-8 -right-3"
        value={message || undefined}
      />
    </form>
  );
};

export default DiscountTag;
