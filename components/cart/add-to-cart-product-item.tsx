"use client";

import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "./actions";
import Cart from "../Icons/cart";
import Tooltip from "../tooltip";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="flex text-sm justify-center items-center bg-red-500 text-white rounded-sm px-3 py-1 disabled:opacity-50"
    >
      <Cart className="w-5 mr-1" /> Add to Cart
    </button>
  );
};

export interface AddToCartFromProductItemProps {
  variantId: string;
}

export const AddToCartFromProductItem: FC<AddToCartFromProductItemProps> = ({
  variantId,
}) => {
  const [message, formAction] = useFormState(addItem, null);
  const actionWithVariant = formAction.bind(null, variantId);

  return (
    <form action={actionWithVariant} className="relative">
      <SubmitButton />
      {message && <Tooltip>{message}</Tooltip>}
    </form>
  );
};
