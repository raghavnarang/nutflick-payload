"use client";

import Trash from "@/components/Icons/trash";
import Button from "@/components/button";
import { useCheckout } from "@/features/checkout";
import { removeCartProduct } from "@/features/server/actions/checkout/product";
import { useEffect, type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface DeleteCheckoutProductProps {
  variantId: number;
}

const FormUI: FC<DeleteCheckoutProductProps> = ({ variantId }) => {
  const { isLoading, setLoading } = useCheckout();
  const { pending: formLoading } = useFormStatus();

  useEffect(() => {
    if (formLoading) setLoading(true);
  }, [formLoading]);

  const pending = formLoading || isLoading;

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

  return (
    <form action={action}>
      <FormUI {...props} />
    </form>
  );
};

export default DeleteCheckoutProduct;
