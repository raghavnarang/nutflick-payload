import Trash from "@/components/Icons/trash";
import Button from "@/components/button";
import ShowToast from "@/components/show-toast";
import { useCheckout } from "@/features/checkout";
import { removeCoupon } from "@/features/server/actions/checkout/coupon";
import { useEffect, type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

const FormUI = () => {
  const { isLoading, setLoading } = useCheckout();
  const { pending: formLoading } = useFormStatus();

  useEffect(() => {
    if (formLoading) setLoading(true);
  }, [formLoading]);

  const pending = formLoading || isLoading;

  return (
    <Button isSecondary icon={Trash} disabled={pending} small>
      Remove
    </Button>
  );
};

const CheckoutRemoveCoupon = () => {
  const [result, action] = useFormState(removeCoupon, null);
  return (
    <form action={action}>
      <FormUI />
      {result && <ShowToast toast={result} />}
    </form>
  );
};

export default CheckoutRemoveCoupon;
