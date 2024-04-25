"use client";

import Button from "@/components/button";
import Dropdown from "@/components/form/dropdown";
import { useCart } from "@/features/cart";
import { changeCartProductQty, removeCartProduct } from "@/features/server/actions/checkout/product";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import { useEffect, useRef, type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface DeleteCheckoutProductProps {
  variantId: number;
}

const FormUI: FC<DeleteCheckoutProductProps> = ({ variantId }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <input type="hidden" value={variantId} name="variantId" />
      <Button small isSecondary disabled={pending}>
        Remove
      </Button>
    </>
  );
};

const DeleteCheckoutProduct: FC<DeleteCheckoutProductProps> = (props) => {
  const [result, action] = useFormState(removeCartProduct, null);

  const { addToast } = useToast();
  const { clear } = useCart();
  useEffect(() => {
    if (result) {
      addToast({
        id: Date.now(),
        message: result.message,
        isDismissable: true,
        type: result.status,
      });

      if (result.status === Status.success) {
        clear(props.variantId);
      }
    }
  }, [result]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={action} ref={formRef}>
      <FormUI {...props} />
    </form>
  );
};

export default DeleteCheckoutProduct;
