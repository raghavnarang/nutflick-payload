import Button from "@/components/button";
import Textbox from "@/components/form/textbox";
import ShowToast from "@/components/show-toast";
import { useCheckout } from "@/features/checkout";
import { applyCoupon } from "@/features/server/actions/checkout/coupon";
import { useEffect, type FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface CheckoutApplyCouponProps {
  coupon?: string;
  onSuccess?: () => void;
}

const FormUI: FC<CheckoutApplyCouponProps> = ({ coupon }) => {
  const { isLoading, setLoading } = useCheckout();
  const { pending: formLoading } = useFormStatus();

  useEffect(() => {
    if (formLoading) setLoading(true);
  }, [formLoading]);

  const pending = formLoading || isLoading;

  return coupon ? (
    <>
      <input type="hidden" value={coupon} name="coupon" />
      <Button small disabled={pending}>
        Apply
      </Button>
    </>
  ) : (
    <div className="flex justify-between w-full sm:gap-5 gap-3 md:px-8 px-4 py-5">
      <Textbox
        name="coupon"
        placeholder="Enter Coupon Name"
        outerWrapperClassname="flex-grow"
        disabled={pending}
        required
      />
      <Button disabled={pending}>Apply</Button>
    </div>
  );
};

const CheckoutApplyCoupon: FC<CheckoutApplyCouponProps> = ({
  coupon,
  onSuccess,
}) => {
  const [result, action] = useFormState(applyCoupon, null);
  return (
    <form action={action}>
      <FormUI coupon={coupon} />
      {result && <ShowToast toast={result} onSuccess={onSuccess} />}
    </form>
  );
};

export default CheckoutApplyCoupon;
