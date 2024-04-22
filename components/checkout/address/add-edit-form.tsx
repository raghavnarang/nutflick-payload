"use client";

import Dropdown from "@/components/form/dropdown";
import Textbox from "@/components/form/textbox";
import SectionBody from "@/components/section/body";
import states from "@/lib/states.json";
import SectionFooter from "../../section/footer";
import Button from "../../button";
import { useFormState, useFormStatus } from "react-dom";
import {
  addAddressToCheckout,
  editAddressAndAddToCheckout,
} from "@/features/server/actions/checkout/address";
import { type FC, useEffect } from "react";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import type { MinimalAddress } from "@/shared/types/address";

interface CheckoutAddressFormProps {
  checkoutId: number;
  address?: MinimalAddress;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const FormUI: FC<{ address?: MinimalAddress; onCancel?: () => void }> = ({
  address,
  onCancel,
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      <SectionBody>
        <div className="grid grid-cols-3 gap-5">
          <div className="grid grid-cols-2 gap-5 col-span-3">
            <Textbox
              label="Full Name"
              name="name"
              placeholder="Enter Full Name"
              required
              disabled={pending}
              defaultValue={address?.name}
            />
            <Textbox
              label="Phone"
              placeholder="Enter Phone Number"
              name="phone"
              prefix="+91"
              type="tel"
              pattern="([0]{1})?[6-9]{1}[0-9]{9}"
              required
              disabled={pending}
              defaultValue={address?.phone}
            />
          </div>
          <Textbox
            outerWrapperClassname="col-span-3"
            placeholder="Enter Address"
            label="Address"
            name="address"
            required
            disabled={pending}
            defaultValue={address?.address}
          />
          <Textbox
            label="City"
            name="city"
            placeholder="Enter City"
            required
            disabled={pending}
            defaultValue={address?.city}
          />
          <Dropdown
            label="State"
            name="state"
            disabled={pending}
            defaultValue={address?.state}
          >
            <option>Select State</option>
            {Object.entries(states).map((state) => (
              <option value={state[1]} key={state[0]}>
                {state[1]}
              </option>
            ))}
          </Dropdown>
          <Textbox
            label="Pincode"
            placeholder="Enter Pincode"
            name="pincode"
            number
            max={999999}
            min={100000}
            required
            disabled={pending}
            defaultValue={address?.pincode}
          />
          {address?.id && <input type="hidden" name="id" value={address.id} />}
        </div>
      </SectionBody>
      <SectionFooter className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {address ? "Update & Deliver Here" : "Save & Deliver Here"}
        </Button>
        {onCancel && (
          <Button
            isSecondary
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            Cancel
          </Button>
        )}
      </SectionFooter>
    </>
  );
};

const CheckoutAddressForm: FC<CheckoutAddressFormProps> = ({
  checkoutId,
  address,
  onSuccess,
  onCancel,
}) => {
  const originalAction = address
    ? editAddressAndAddToCheckout
    : addAddressToCheckout;
  const actionWithCheckoutId = originalAction.bind(null, checkoutId);
  const [result, action] = useFormState(actionWithCheckoutId, null);

  const { addToast } = useToast();
  useEffect(() => {
    if (result) {
      if (result.status === Status.error) {
        addToast({
          id: Date.now(),
          type: result.status,
          message: result.message,
          isDismissable: true,
        });
      } else if (result.status === Status.success) {
        onSuccess?.();
      }
    }
  }, [result]);

  return (
    <form action={action}>
      <FormUI address={address} onCancel={onCancel} />
    </form>
  );
};

export default CheckoutAddressForm;
