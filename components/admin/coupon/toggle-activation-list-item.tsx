'use client'

import Button from "@/components/button";
import ShowToast from "@/components/show-toast";
import { toggleCouponActivation } from "@/features/server/actions/admin/coupon";
import type { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface CouponToggleActivationListItemProps {
  isActive: boolean;
  id: number;
}

const FormUI: FC<CouponToggleActivationListItemProps> = ({ isActive, id }) => {
  const { pending } = useFormStatus();

  return (
    <Button isSuccess={!isActive} small disabled={pending}>
      {!isActive ? "Activate" : "Deactivate"}
    </Button>
  );
};

const CouponToggleActivationListItem: FC<
  CouponToggleActivationListItemProps
> = ({ isActive, id }) => {
  const [result, action] = useFormState(toggleCouponActivation, null);
  const actionWithId = action.bind(null, id);

  return (
    <form action={actionWithId}>
      <FormUI isActive={isActive} id={id} />
      {result && <ShowToast toast={result} />}
    </form>
  );
};

export default CouponToggleActivationListItem;
