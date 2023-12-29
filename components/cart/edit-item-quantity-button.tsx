"use client";

import { CartItem } from "@/lib/shopify/types";
import { updateItemQuantity } from "./actions";
import { FC, useEffect } from "react";
import Minus from "@/components/Icons/minus";
import Plus from "@/components/Icons/plus";
import useToastWithServerPromise from "@/features/toast/hooks/use-toast-with-server-promise";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/features/toast";

type EditItemQuantityButtonType = "plus" | "minus";

export interface EditItemQuantityButtonProps {
  item: CartItem;
  type: EditItemQuantityButtonType;
}

const SubmitButton: FC<Omit<EditItemQuantityButtonProps, "item">> = ({
  type,
}) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="disabled:opacity-50">
      {type === "minus" ? (
        <Minus className="text-red-500" />
      ) : (
        <Plus className="text-red-500" />
      )}
    </button>
  );
};

const EditItemQuantityButton: FC<EditItemQuantityButtonProps> = ({
  item,
  type,
}) => {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const actionWithPayload = formAction.bind(null, {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  });

  const { addToast } = useToast();
  useEffect(() => {
    if (message) {
      addToast({
        id: Date.now(),
        isDismissable: true,
        message: message.message,
        type: message.status,
      });
    }
  }, [message]);

  return (
    <form className="h-6" action={actionWithPayload}>
      <SubmitButton type={type} />
    </form>
  );
};

export default EditItemQuantityButton;
