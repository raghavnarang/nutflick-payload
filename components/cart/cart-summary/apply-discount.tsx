"use client";

import { addCartDiscountCode } from "../actions";
import { useState } from "react";
import useToastWithServerPromise from "@/features/toast/hooks/use-toast-with-server-promise";


const ApplyDiscount = () => {
  const [code, setCode] = useState("");
  const [pending, addDiscount] = useToastWithServerPromise(
    () => addCartDiscountCode(code),
    `Applying code: ${code}`,
    undefined,
    () => setCode("")
  );

  return (
    <form
      className="w-full flex items-center relative"
      onSubmit={(e) => {
        e.preventDefault();
        addDiscount();
      }}
    >
      <input
        className="text-sm px-3 py-2 border border-solid border-gray-300 focus:border-gray-400 outline-none rounded-sm w-full mr-5 disabled:opacity-50"
        type="text"
        name="code"
        placeholder="Discount Code"
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={pending}
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-sm text-sm bg-gray-200 text-gray-700 px-3 py-2 hover:bg-gray-30æ0 disabled:hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        Apply
      </button>
    </form>
  );
};

export default ApplyDiscount;
