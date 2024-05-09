import Button from "@/components/button";
import ShowToast from "@/components/show-toast";
import { toggleCouponActivation } from "@/features/server/actions/admin/coupon";
import type { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import cx from "classnames";

interface CouponToggleActivationInsideFormProps {
  isActive: boolean;
  id: number;
}

const CouponToggleActivationInsideForm: FC<
  CouponToggleActivationInsideFormProps
> = ({ isActive, id }) => {
  const [result, action] = useFormState(toggleCouponActivation, null);
  const { pending } = useFormStatus();
  const actionWithId = action.bind(null, id);

  return (
    <div className="flex gap-5 items-center">
      <p>
        <span
          className={cx("rounded-full size-3 inline-block mr-2", {
            "bg-green-500": isActive,
            "bg-red-500": !isActive,
          })}
        />
        {isActive ? "Active" : "Inactive"}
      </p>
      <Button
        isSuccess={!isActive}
        type="submit"
        disabled={pending}
        formAction={actionWithId}
      >
        {!isActive ? "Activate" : "Deactivate"}
      </Button>
      {result && <ShowToast toast={result} />}
    </div>
  );
};

export default CouponToggleActivationInsideForm;
