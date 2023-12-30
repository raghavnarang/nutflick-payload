"use client";

import { useState, type FC } from "react";
import Plus from "../Icons/plus";
import useToastWithServerPromise from "@/features/toast/hooks/use-toast-with-server-promise";
import { updateItemQuantity } from "./actions";
import { ServerMessage } from "@/shared/types/server-message";
import { Status } from "@/shared/types/status";
import { CartItem } from "@/lib/shopify/types";
import Minus from "../Icons/minus";
import { useDebouncedCallback } from "use-debounce";

interface EditItemQuantityProps {
  item: CartItem;
}

const EditItemQuantity: FC<EditItemQuantityProps> = ({ item }) => {
  const [qty, setQty] = useState(() => item.quantity);

  const afterUpdateResult = (result?: ServerMessage) => {
    if (result?.status === Status.error) {
      setQty(item.quantity);
    }
  };

  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: qty,
  };

  const [pending, updateQty] = useToastWithServerPromise(
    () => updateItemQuantity(null, payload),
    "Updating item quantity...",
    undefined,
    afterUpdateResult
  );

  const debouncedUpdateQty = useDebouncedCallback(updateQty, 400);

  const update = (type: "increment" | "decrement") => {
    setQty(type === "increment" ? qty + 1 : qty - 1);
    debouncedUpdateQty();
  };

  return (
    <div className="flex">
      <button
        disabled={pending || qty === 1}
        className="disabled:opacity-50"
        onClick={() => update("decrement")}
      >
        <Minus className="text-red-500" />
      </button>
      <span className="px-3">{qty}</span>
      <button
        disabled={pending}
        className="disabled:opacity-50"
        onClick={() => update("increment")}
      >
        <Plus className="text-red-500" />
      </button>
    </div>
  );
};

export default EditItemQuantity;
