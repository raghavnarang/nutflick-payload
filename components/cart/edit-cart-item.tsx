"use client";

import { type FC } from "react";
import Plus from "../Icons/plus";
import Minus from "../Icons/minus";
import Button from "../button";
import cx from "classnames";
import { useCart } from "@/features/cart";

interface EditCartItemProps {
  variantId: number;
  qty: number;
  className?: string;
  bigButton?: boolean;
}

const EditCartItem: FC<EditCartItemProps> = ({
  variantId,
  qty,
  className,
  bigButton,
}) => {
  const { increment, decrement, clear } = useCart();

  return (
    <div
      className={cx(
        "flex flex-col md:flex-row items-start",
        {
          "md:items-center justify-between": !bigButton,
          "md:flex-col": bigButton,
        },
        className
      )}
    >
      <div className="flex mr-5 md:mb-0 mb-5 items-center">
        <button
          className="disabled:opacity-50"
          onClick={() => decrement(variantId)}
        >
          <Minus className="text-red-500" />
        </button>
        <span className="px-3">{qty}</span>
        <button
          className="disabled:opacity-50"
          onClick={() => increment(variantId)}
        >
          <Plus className="text-red-500" />
        </button>
      </div>
      <Button
        isSecondary
        small={!bigButton}
        large={bigButton}
        className={cx("md:mb-0 mb-5", { "xl:w-1/2 mt-10": bigButton })}
        onClick={() => clear(variantId)}
      >
        Remove from Cart
      </Button>
    </div>
  );
};

export default EditCartItem;
