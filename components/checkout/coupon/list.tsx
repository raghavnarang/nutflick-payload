import LoadingAnimated from "@/components/Icons/loading-animated";
import BigMessage from "@/components/big-message";
import Button from "@/components/button";
import Textbox from "@/components/form/textbox";
import Price from "@/components/product/price";
import Section from "@/components/section";
import SectionBody from "@/components/section/body";
import SectionFooter from "@/components/section/footer";
import { getCheckoutCoupons } from "@/features/server/checkout/coupon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { FC } from "react";
import { Error } from "@/components/Icons";
import { CouponValueType } from "@/shared/types/coupon";
import cx from "classnames";
import CheckoutDisplayCoupon from "./display-coupon";
import CheckoutApplyCoupon from "./apply-coupon";

interface CheckoutCouponsListProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  subtotal: number;
}

const CheckoutCouponsList: FC<CheckoutCouponsListProps> = ({
  onCancel,
  onSuccess,
  subtotal,
}) => {
  const queryClient = useQueryClient();

  const {
    data: coupons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCheckoutCoupons(),
  });

  if (isLoading) {
    return (
      <Section title="Coupons">
        <SectionBody className="flex justify-center items-center h-32">
          <LoadingAnimated />
        </SectionBody>
      </Section>
    );
  }

  if (isError || !coupons) {
    return (
      <SectionBody>
        <BigMessage
          icon={Error}
          button={{
            text: "Try Again",
            onClick: () => {
              queryClient.invalidateQueries({ queryKey: ["coupons"] });
            },
          }}
        >
          Something Went Wrong. Unable to load addresses.
        </BigMessage>
      </SectionBody>
    );
  }

  return (
    <Section title="Coupons">
      <CheckoutApplyCoupon onSuccess={onSuccess} />
      {coupons.map((coupon) => (
        <CheckoutDisplayCoupon
          {...coupon}
          subtotal={subtotal}
          onSuccess={onSuccess}
        />
      ))}
      <SectionFooter>
        <Button onClick={onCancel} isSecondary>
          Cancel
        </Button>
      </SectionFooter>
    </Section>
  );
};

export default CheckoutCouponsList;
