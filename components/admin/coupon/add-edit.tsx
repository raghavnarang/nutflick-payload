"use client";

import Back from "@/components/Icons/back";
import Button from "@/components/button";
import Dropdown from "@/components/form/dropdown";
import Radio from "@/components/form/radio";
import Textbox from "@/components/form/textbox";
import ShowToast from "@/components/show-toast";
import { addCoupon, editCoupon } from "@/features/server/actions/admin/coupon";
import { Coupon, CouponValueType } from "@/shared/types/coupon";
import { Status } from "@/shared/types/status";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import CouponToggleActivationInsideForm from "./toggle-activation-inside-form";
import Checkbox from "@/components/form/checkbox";

interface AddEditCouponProps {
  editCoupon?: Coupon;
}

const FormUI: FC<AddEditCouponProps> = ({ editCoupon }) => {
  const isEdit = !!editCoupon;
  const [isInfiniteUsage, setInfiniteUsage] = useState(!editCoupon?.max_use);
  const [type, setType] = useState(
    editCoupon?.value_type || CouponValueType.FIXED
  );

  const { pending } = useFormStatus();

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-5">
          <Link href="/admin/coupon">
            <Back />
          </Link>
          <h1 className="text-xl font-medium">
            {isEdit ? "Edit Coupon" : "Add Coupon"}
          </h1>
        </div>
        <div className="flex gap-3">
          {editCoupon && (
            <CouponToggleActivationInsideForm
              isActive={editCoupon.is_active}
              id={editCoupon.id}
            />
          )}
          <Button type="submit" isSuccess disabled={pending}>
            Save
          </Button>
        </div>
      </div>
      <div className="flex gap-10 flex-col">
        <Textbox
          name="coupon"
          label="Coupon Name"
          placeholder="Add Coupon Name"
          required
          disabled={pending}
          defaultValue={editCoupon?.coupon}
        />
        <div className="flex gap-10">
          <Textbox
            name="value"
            number
            label="Value"
            placeholder="Add Coupon Value"
            required
            outerWrapperClassname="w-full"
            disabled={pending}
            defaultValue={editCoupon?.value}
            prefix={type === CouponValueType.FIXED ? "₹" : undefined}
            suffix={type === CouponValueType.PERCENTAGE ? "%" : undefined}
          />
          <Dropdown
            label="Value Type"
            name="value_type"
            outerWrapperClassName="w-full"
            disabled={pending}
            onChange={(e) =>
              setType(parseInt(e.target.value) as CouponValueType)
            }
            value={type}
          >
            <option value={CouponValueType.FIXED}>Fixed (₹)</option>
            <option value={CouponValueType.PERCENTAGE}>Percentage (%)</option>
          </Dropdown>
        </div>
        <div>
          <p className="mb-3">Coupon Limits</p>
          <div className="flex gap-10">
            <Textbox
              name="min_cart_value"
              number
              label="Minimum cart value required for using this coupon"
              placeholder="Add Minimum Cart Value"
              outerWrapperClassname="w-full"
              disabled={pending}
              defaultValue={editCoupon?.min_cart_value || undefined}
              prefix="₹"
            />
            <Textbox
              name="max_discount"
              number
              label="Maximum discount (Upto)"
              placeholder="Add Maximum Discount Value"
              outerWrapperClassname="w-full"
              disabled={pending || type !== CouponValueType.PERCENTAGE}
              defaultValue={editCoupon?.max_discount || undefined}
              prefix="₹"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-3 w-full">
            <p>Coupon Usage</p>
            <Radio
              label="User can use this coupon infinitely"
              id="infinite"
              checked={isInfiniteUsage}
              onChange={() => setInfiniteUsage(true)}
              name="is_infinite"
              value={1}
              disabled={pending}
            />
            <Radio
              label="User can use this coupon for limited number of times"
              id="limited"
              checked={!isInfiniteUsage}
              onChange={() => setInfiniteUsage(false)}
              name="is_infinite"
              value={0}
              disabled={pending}
            />
          </div>
          <Textbox
            name="max_use"
            number
            placeholder="Enter max usage per user"
            required
            outerWrapperClassname="w-full"
            disabled={isInfiniteUsage || pending}
            defaultValue={editCoupon?.max_use || 1}
            label="Number of usages per user"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p>Coupon Visibility</p>
          <Checkbox
            name="checkout_visible"
            label="Show coupon on checkout coupons (discount) panel"
            defaultChecked={editCoupon?.checkout_visible || false}
          />
        </div>
        {editCoupon && <input type="hidden" value={editCoupon.id} name="id" />}
      </div>
    </div>
  );
};

const AddEditCoupon: FC<AddEditCouponProps> = ({ editCoupon: coupon }) => {
  const [result, action] = useFormState(coupon ? editCoupon : addCoupon, null);

  const router = useRouter();
  useEffect(() => {
    if (result?.status === Status.success) {
      router.push(
        !coupon && result.couponId
          ? `/admin/coupon/${result.couponId}`
          : "/admin/coupon"
      );
    }
  }, [result]);

  return (
    <form action={action}>
      <FormUI editCoupon={coupon} />
      {result && <ShowToast toast={result} />}
    </form>
  );
};

export default AddEditCoupon;
