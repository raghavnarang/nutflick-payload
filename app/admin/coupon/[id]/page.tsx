import AddEditCoupon from "@/components/admin/coupon/add-edit";
import { getCouponById } from "@/features/server/admin/coupon";
import type { FC } from "react";

interface EditCouponProps {
  params: { id: string };
}

const EditCoupon: FC<EditCouponProps> = async ({ params: { id } }) => {
  const coupon = await getCouponById(+id);

  return <AddEditCoupon editCoupon={coupon} />;
};

export default EditCoupon;
