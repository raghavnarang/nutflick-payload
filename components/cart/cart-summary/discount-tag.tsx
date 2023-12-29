"use client";

import Cross from "@/components/Icons/cross";
import { type FC } from "react";
import cx from "classnames";
import { removeCartDiscountCode } from "../actions";
import useToastWithServerPromise from "@/features/toast/hooks/use-toast-with-server-promise";

interface DiscountTagProps {
  code: string;
}

const DiscountTag: FC<DiscountTagProps> = ({ code }) => {
  const [pending, removeDiscount] = useToastWithServerPromise(
    () => removeCartDiscountCode(code),
    `Removing code: ${code}`
  );

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        removeDiscount();
      }}
    >
      <div
        className={cx(
          "text-xs flex items-center bg-gray-200 rounded-full pl-1",
          {
            "opacity-50": pending,
          }
        )}
      >
        <span className="px-1">{code.toUpperCase()}</span>
        <button type="submit" disabled={pending}>
          <Cross className="text-gray-500 hover:text-gray-600" />
        </button>
      </div>
    </form>
  );
};

export default DiscountTag;
