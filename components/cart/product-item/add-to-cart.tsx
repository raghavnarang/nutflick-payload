"use client";

import type { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "../actions";
import Cart from "../../Icons/cart";
import FormTooltip from "../form-tooltip";

export interface AddToCartProps {
  variantId: string;
  bigButton?: boolean;
}

const SubmitButton: FC<Omit<AddToCartProps, "variantId">> = ({
  bigButton = false,
}) => {
  const { pending } = useFormStatus();

  if (bigButton) {
    return (
      <button
        disabled={pending}
        className="block text-lg text-center bg-red-500 text-white rounded-lg py-3 w-1/2 hover:bg-red-600 transition-colors mt-10 disabled:opacity-50"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <button
      disabled={pending}
      className="w-10 h-10 flex text-sm justify-center items-center bg-red-500 text-white rounded-sm disabled:opacity-50"
    >
      <Cart />
    </button>
  );
};

const AddToCart: FC<AddToCartProps> = ({ variantId, bigButton = false }) => {
  const [result, formAction] = useFormState(addItem, null);
  const actionWithVariant = formAction.bind(null, variantId);

  return (
    <form action={actionWithVariant} className="relative">
      <SubmitButton bigButton={bigButton} />
      <FormTooltip value={result || undefined} className="-bottom-9" />
    </form>
  );
};

export default AddToCart;
