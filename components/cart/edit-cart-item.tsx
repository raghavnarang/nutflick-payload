"use client";

import {
  useState,
  type FC,
  useTransition,
  useEffect,
  useRef,
  TransitionStartFunction,
} from "react";
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
  bigButton?: boolean;
}

interface FormControlProps {
  item: CartItem;
  pending: boolean;
}

interface UpdateItemQuantityProps extends FormControlProps {
  startTransition: TransitionStartFunction;
}

interface RemoveFromCartProps extends FormControlProps {
  bigButton?: boolean;
}

const RemoveFromCart: FC<RemoveFromCartProps> = ({
  item,
  pending,
  bigButton = false,
}) => {
  const [result, action] = useFormState(removeItem, null);
  const actionWithPayload = action.bind(null, item.id);

  const { addToast } = useToast();

  useEffect(() => {
    if (result && result.status === Status.error) {
      addToast({
        message: result.message,
        type: result.status,
        id: Date.now(),
        isDismissable: true,
      });
    }
  }, [result]);

  return (
    <Button
      isSecondary
      small={!bigButton}
      large={bigButton}
      className={cx("md:mb-0 mb-5", { "xl:w-1/2 mt-10": bigButton })}
      disabled={pending}
      formAction={actionWithPayload}
    >
      Remove from Cart
    </Button>
  );
};

const UpdateItemQuantity: FC<UpdateItemQuantityProps> = ({
  item,
  pending,
  startTransition,
}) => {
  const [qty, setQty] = useState(() => item.quantity);
  const updateQtyResult = useRef<ServerMessage>();

  const { addToast } = useToast();

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

  useEffect(() => {
    setQty(item.quantity);
  }, [item]);

  const debouncedUpdateQty = useDebouncedCallback((value: number) => {
    startTransition!(async () => {
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
    <div className="flex mr-5 md:mb-0 mb-5 items-center">
      <button
        formAction={() => updateQty("decrement")}
        disabled={pending || qty === 1}
        className="disabled:opacity-50"
      >
        <Minus className="text-red-500" />
      </button>
      <span className="px-3">{qty}</span>
      <button
        formAction={() => updateQty("increment")}
        disabled={pending}
        className="disabled:opacity-50"
      >
        <Plus className="text-red-500" />
      </button>
    </div>
  );
};

const FormControls: FC<EditCartItemProps> = ({
  item,
  className,
  bigButton,
}) => {
  const { pending: removePending } = useFormStatus();
  const [qtyPending, startTransition] = useTransition();

  const pending = qtyPending || removePending;

  return (
    <div
      className={cx(
        "flex flex-col md:flex-row items-start",
        {
          "md:items-center justify-between": !bigButton,
          "flex-col": bigButton,
        },
        className
      )}
    >
      <UpdateItemQuantity
        item={item}
        pending={pending}
        startTransition={startTransition}
      />
      <RemoveFromCart item={item} pending={pending} bigButton={bigButton} />
    </div>
  );
};

const EditCartItem: FC<EditCartItemProps> = (props) => (
  <form>
    <FormControls {...props} />
  </form>
);

export default EditCartItem;
