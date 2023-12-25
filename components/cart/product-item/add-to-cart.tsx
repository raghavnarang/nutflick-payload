"use client";

import type { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "../actions";
import Cart from "../../Icons/cart";
import FormTooltip from "../form-tooltip";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-10 h-10 flex text-sm justify-center items-center bg-red-500 text-white rounded-sm disabled:opacity-50"
    >
      <Cart />
    </button>
  );
};

export interface AddToCartProps {
  variantId: string;
}

const AddToCart: FC<AddToCartProps> = ({ variantId }) => {
  const [result, formAction] = useFormState(addItem, null);
  const actionWithVariant = formAction.bind(null, variantId);

  return (
    <form action={actionWithVariant} className="relative">
      <SubmitButton />
      <FormTooltip value={result || undefined} className="-bottom-9" />
    </form>
  );
};

export default AddToCart;
