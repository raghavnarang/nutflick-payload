"use client";

import { useState, type FC, useTransition, useEffect, useRef } from "react";
import Plus from "../Icons/plus";
import { removeItem, updateItemQuantity } from "./actions";
import { ServerMessage } from "@/shared/types/server-message";
import { Status } from "@/shared/types/status";
import { CartItem } from "@/lib/shopify/types";
import Minus from "../Icons/minus";
import { useDebouncedCallback } from "use-debounce";
import Button from "../button";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/features/toast";
import cx from "classnames";

interface EditCartItemProps {
  item: CartItem;
  className?: string;
}

const FormControls: FC<EditCartItemProps> = ({ item, className }) => {
  const { pending: removePending } = useFormStatus();

  const [removeResult, removeAction] = useFormState(removeItem, null);
  const removeActionWithPayload = removeAction.bind(null, item.id);

  const { addToast } = useToast();

  useEffect(() => {
    if (removeResult && removeResult.status === Status.error) {
      addToast({
        message: removeResult.message,
        type: removeResult.status,
        id: Date.now(),
        isDismissable: true,
      });
    }
  }, [removeResult]);

  const [pending, startTransition] = useTransition();

  const [qty, setQty] = useState(() => item.quantity);
  const updateQtyResult = useRef<ServerMessage>();

  useEffect(() => {
    const result = updateQtyResult.current;

    if (!pending && result) {
      addToast({
        message: result.message,
        type: result.status,
        id: Date.now(),
        isDismissable: true,
      });
    }

    if (result?.status === Status.error) {
      setQty(item.quantity);
    }

    updateQtyResult.current = undefined;
  }, [pending]);

  const debouncedUpdateQty = useDebouncedCallback((value: number) => {
    startTransition(async () => {
      const result = await updateItemQuantity({
        lineId: item.id,
        variantId: item.merchandise.id,
        quantity: value,
      });

      updateQtyResult.current = result;
    });
  }, 500);

  const updateQty = (type?: "increment" | "decrement") => {
    const value = type === "increment" ? qty + 1 : qty - 1;
    setQty(value);
    debouncedUpdateQty(value);
  };

  return (
    <div className={cx("flex items-center justify-between", className)}>
      <div className="flex mr-5">
        <button
          formAction={() => updateQty("decrement")}
          disabled={removePending || pending || qty === 1}
          className="disabled:opacity-50"
        >
          <Minus className="text-red-500" />
        </button>
        <span className="px-3">{qty}</span>
        <button
          formAction={() => updateQty("increment")}
          disabled={removePending || pending}
          className="disabled:opacity-50"
        >
          <Plus className="text-red-500" />
        </button>
      </div>
      <Button
        isSecondary
        small
        disabled={removePending || pending}
        formAction={removeActionWithPayload}
      >
        Remove from Cart
      </Button>
    </div>
  );
};

const EditCartItem: FC<EditCartItemProps> = (props) => (
  <form>
    <FormControls {...props} />
  </form>
);

export default EditCartItem;
