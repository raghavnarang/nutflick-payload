"use client";

import { CartItem } from "@/lib/shopify/types";
import { useFormState, useFormStatus } from "react-dom";
import { updateItemQuantity } from "./actions";
import { FC } from "react";
import Minus from "@/components/Icons/minus";
import Plus from "@/components/Icons/plus";

type EditItemQuantityButtonType = "plus" | "minus";

export interface EditItemQuantityButtonProps {
  item: CartItem;
  type: EditItemQuantityButtonType;
}

function SubmitButton({ type }: { type: EditItemQuantityButtonType }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="disabled:opacity-50"
    >
      {type === "minus" ? <Minus className="text-red-500" /> : <Plus className="text-red-500" />}
    </button>
  );
}

const EditItemQuantityButton: FC<EditItemQuantityButtonProps> = ({
  item,
  type,
}) => {
  const [, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant} className="h-6">
      <SubmitButton type={type} />
    </form>
  );
};

export default EditItemQuantityButton;
