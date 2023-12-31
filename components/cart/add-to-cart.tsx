"use client";

import { useEffect, type FC } from "react";
import cx from "classnames";
import Cart from "../Icons/cart";
import Button from "../button";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import useToastWithServerPromise from "@/features/toast/hooks/use-toast-with-server-promise";
import { getImage, getVariantTitle } from "@/shared/utils/product";
import { addItem } from "./actions";
import { Icon } from "../Icons/types";
import { useFormState, useFormStatus } from "react-dom";
import { Status } from "@/shared/types/status";
import { useToast } from "@/features/toast";

export interface AddToCartProps {
  variantId: string;
  showIcon?: boolean;
  bigButton?: boolean;
}

interface SubmitButtonProps {
  bigButton?: boolean;
  showIcon?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ bigButton, showIcon }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={cx({ "!w-1/2": bigButton })}
      icon={showIcon ? Cart : undefined}
      large={bigButton}
      small={!bigButton}
    >
      Add to Cart
    </Button>
  );
};

const AddToCart: FC<AddToCartProps> = (props) => {
  const [result, action] = useFormState(addItem, null);
  const actionWithVariantId = action.bind(null, props.variantId);

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
    <form className="relative" action={actionWithVariantId}>
      <SubmitButton {...props} />
    </form>
  );
};

export default AddToCart;
