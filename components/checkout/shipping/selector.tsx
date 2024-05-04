"use client";

import Price from "@/components/product/price";
import SectionRadio from "@/components/section/radio";
import ShowToast from "@/components/show-toast";
import { useCheckout } from "@/features/checkout";
import { changeShippingMode } from "@/features/server/actions/checkout/shipping";
import { ShippingCourier, ShippingMode } from "@/shared/types/shipping";
import { Status } from "@/shared/types/status";
import { FC, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface CheckoutShippingSelectorProps {
  couriers: ShippingCourier[];
  selected?: ShippingMode;
}

const FormUI: FC<CheckoutShippingSelectorProps & { onChange?: () => void }> = ({
  couriers,
  onChange,
  selected,
}) => {
  const { isLoading, setLoading } = useCheckout();
  const { pending: formLoading } = useFormStatus();

  useEffect(() => {
    if (formLoading) setLoading(true);
  }, [formLoading]);

  const pending = formLoading || isLoading;

  const isSelectedModeExists = !!couriers.find((c) => c.mode === selected);
  useEffect(() => {
    if (!isSelectedModeExists) {
      onChange?.();
    }
  }, [isSelectedModeExists]);

  return (
    <>
      {couriers.map((i, index) => (
        <SectionRadio
          name="mode"
          key={i.mode}
          value={i.mode}
          id={`mode_${i.mode}`}
          disabled={pending}
          onChange={onChange}
          checked={isSelectedModeExists ? selected === i.mode : index === 0}
          label={
            <p className="flex flex-col">
              <span>
                Shipping By{" "}
                <b>{i.mode === ShippingMode.AIR ? "Air" : "Surface"}</b>
              </span>
              {i.estDays ? (
                <span className="text-sm text-gray-600">
                  Estimated Delivery ~{i.estDays} Days
                </span>
              ) : null}
            </p>
          }
        >
          {!Math.trunc(i.rate) ? (
            <span className="bg-green-100 text-green-800 border border-green-300 text-sm px-3 py-1 rounded">
              Free
            </span>
          ) : (
            <Price price={i.rate} />
          )}
        </SectionRadio>
      ))}
    </>
  );
};

const CheckoutShippingSelector: FC<CheckoutShippingSelectorProps> = (props) => {
  const [result, action] = useFormState(changeShippingMode, null);
  const ref = useRef<HTMLFormElement>(null);
  const { setLoading, setShipping } = useCheckout();

  useEffect(() => {
    if (result) {
      setLoading(false);
    }
  }, [result]);

  /** Remove Loading onload as default loading state is true on provider level
   * because the Shipping selector is expected not to be loaded, because calculation of shipping charges in progress */
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setShipping(
      props.couriers.find((c) => c.mode === props.selected)?.rate || 0
    );
  }, [props.selected, props.couriers]);

  return (
    <form action={action} ref={ref}>
      <FormUI
        {...props}
        onChange={() => {
          ref.current?.requestSubmit();
        }}
      />
      {result && <ShowToast toast={result} />}
    </form>
  );
};

export default CheckoutShippingSelector;
