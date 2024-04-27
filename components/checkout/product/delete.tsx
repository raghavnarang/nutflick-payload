"use client";

import Trash from "@/components/Icons/trash";
import Button from "@/components/button";
import {
  removeCartProduct,
} from "@/features/server/actions/checkout/product";
import { useRef, type FC } from "react";
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
        <Trash />
      </Button>
    </>
  );
};

const DeleteCheckoutProduct: FC<DeleteCheckoutProductProps> = (props) => {
  const [, action] = useFormState(removeCartProduct, null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={action} ref={formRef}>
      <FormUI {...props} />
    </form>
  );
};

export default DeleteCheckoutProduct;
