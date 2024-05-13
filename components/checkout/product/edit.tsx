"use client";

import Dropdown from "@/components/form/dropdown";
import { useCart } from "@/features/cart";
import { useCheckout } from "@/features/checkout";
import { changeCartProductQty } from "@/features/server/actions/checkout/product";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import { useEffect, useRef, type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface EditCheckoutProductProps {
  qty: number;
  variantId: number;
}

const FormUI: FC<EditCheckoutProductProps & { onChange?: () => void }> = ({
  qty,
  variantId,
  onChange,
}) => {
  const { isLoading, setLoading } = useCheckout();
  const { pending: formLoading } = useFormStatus();

  useEffect(() => {
    if (formLoading) setLoading(true);
  }, [formLoading]);

  const pending = formLoading || isLoading;

  return (
    <>
      <Dropdown
        name="qty"
        defaultValue={qty}
        inputWrapperClassName="!h-auto w-20"
        disabled={pending}
        onChange={onChange}
      >
        {Array.from(Array(100).keys()).map((i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </Dropdown>
      <input type="hidden" value={variantId} name="variantId" />
    </>
  );
};

const EditCheckoutProduct: FC<EditCheckoutProductProps> = (props) => {
  const [result, action] = useFormState(changeCartProductQty, null);

  const { addToast } = useToast();
  const { setQty } = useCart();
  useEffect(() => {
    if (result) {
      addToast({
        id: Date.now(),
        message: result.message,
        isDismissable: true,
        type: result.status,
      });

      if (result.status === Status.success && result.qty) {
        setQty(props.variantId, result.qty);
      }
    }
  }, [result]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={action} ref={formRef}>
      <FormUI {...props} onChange={() => formRef.current?.requestSubmit()} />
    </form>
  );
};

export default EditCheckoutProduct;
