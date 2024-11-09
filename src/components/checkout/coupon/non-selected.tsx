import Button from "@/components/button";
import type { FC } from "react";

interface CheckoutCouponNonSelectedProps {
  onViewCoupons?: () => void;
}

const CheckoutCouponNonSelected: FC<CheckoutCouponNonSelectedProps> = ({
  onViewCoupons,
}) => {
  return (
    <div className="flex justify-between items-center w-full gap-5 md:px-8 px-4 py-5 bg-gray-50 rounded-lg mb-10">
      <p>Apply Coupon</p>
      <Button isInfo small onClick={onViewCoupons}>
        View Coupons
      </Button>
    </div>
  );
};

export default CheckoutCouponNonSelected;
