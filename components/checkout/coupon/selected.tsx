import { Tick } from "@/components/Icons";
import Price from "@/components/product/price";
import type { Coupon } from "@/shared/types/coupon";
import type { FC } from "react";
import CheckoutRemoveCoupon from "./remove-coupon";

interface CheckoutCouponSelectedProps
  extends Pick<Coupon, "id" | "coupon" | "value"> {
  subtotal: number;
}

const CheckoutCouponSelected: FC<CheckoutCouponSelectedProps> = ({
  subtotal,
  ...coupon
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-5 md:px-8 px-4 py-5 bg-gray-50 rounded-lg mb-10">
    <div className="flex items-center gap-2">
      <Tick className="text-green-600 inline-block !size-8 flex-shrink-0" />
      <p>
        You saved{" "}
        <Price price={coupon.value} className="text-green-600 font-semibold" />{" "}
        with{" "}
        <span className="font-semibold">'{coupon.coupon.toUpperCase()}'</span>
      </p>
    </div>
    <CheckoutRemoveCoupon />
  </div>
);

export default CheckoutCouponSelected;
