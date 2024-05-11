"use client";

import Button from "@/components/button";
import Textbox from "@/components/form/textbox";
import Price from "@/components/product/price";
import Section from "@/components/section";
import SectionFooter from "@/components/section/footer";
import { useState } from "react";

enum CouponMode {
  DEFAULT,
  APPLY,
}

const CheckoutCoupons = () => {
  const [mode, setMode] = useState(CouponMode.DEFAULT);

  if (mode === CouponMode.DEFAULT) {
    return (
      <div className="flex justify-between items-center w-full gap-5 md:px-8 px-4 py-5 bg-gray-50 rounded-lg mb-10">
        <p>Apply Coupon</p>
        <Button isInfo onClick={() => setMode(CouponMode.APPLY)}>
          View Coupons
        </Button>
      </div>
    );
  }

  return (
    <Section title="Coupons">
      <div className="flex justify-between w-full gap-5 md:px-8 px-4 py-5">
        <Textbox
          name="apply_coupon"
          placeholder="Enter Coupon Name"
          outerWrapperClassname="flex-grow"
        />
        <Button>Apply</Button>
      </div>
      <div className="border-t border-gray-200 md:px-8 px-4 py-5">
        <div className="flex justify-between items-center gap-5 mb-5">
          <span className="uppercase font-semibold tracking-widest border-4 border-red-400 border-dashed rounded-lg px-3 py-1">
            the coupon
          </span>
          <div className="text-right">
            <p className="text-xl font-semibold">40% off</p>
            <p>
              upto <Price price={80} />
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button small>Apply</Button>
        </div>
      </div>
      <div className="border-t border-gray-200 md:px-8 px-4 py-5">
        <div className="flex justify-between items-center gap-5 mb-5">
          <span className="uppercase font-semibold tracking-widest border-4 border-gray-300 border-dashed rounded-lg px-3 py-1">
            the coupon
          </span>
          <div className="text-right">
            <p className="text-xl font-semibold">40% off</p>
            <p>
              upto <Price price={80} />
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="border border-blue-300 text-blue-800 bg-blue-100 text-sm rounded px-3 py-1 inline-block">
            Add more items worth <Price price={80} /> to use this coupon
          </span>
          <Button small>Apply</Button>
        </div>
      </div>
      <SectionFooter>
        <Button onClick={() => setMode(CouponMode.DEFAULT)} isSecondary>Cancel</Button>
      </SectionFooter>
    </Section>
  );
};

export default CheckoutCoupons;
