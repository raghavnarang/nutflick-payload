"use client";

import Dropdown from "@/components/form/dropdown";
import Textbox from "@/components/form/textbox";
import Section from "@/components/section";
import SectionBody from "@/components/section/body";
import states from "@/lib/states.json";
import SectionFooter from "../section/footer";
import Button from "../button";
import { useFormState, useFormStatus } from "react-dom";
import { addAddressToCheckout } from "@/features/server/actions/checkout/address";
import { FC } from "react";

const FormUI = () => {
  const { pending } = useFormStatus();

  return (
    <Section title="Delivery Address">
      <SectionBody>
        <div className="grid grid-cols-3 gap-5">
          <div className="grid grid-cols-2 gap-5 col-span-3">
            <Textbox
              label="Full Name"
              name="name"
              placeholder="Enter Full Name"
              required
              disabled={pending}
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
            />
          </div>
          <Textbox
            outerWrapperClassname="col-span-3"
            placeholder="Enter Address"
            label="Address"
            name="address"
            required
            disabled={pending}
          />
          <Textbox
            label="City"
            name="city"
            placeholder="Enter City"
            required
            disabled={pending}
          />
          <Dropdown label="State" name="state" disabled={pending}>
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
          />
        </div>
      </SectionBody>
      <SectionFooter className="text-right">
        <Button type="submit" disabled={pending}>
          Continue
        </Button>
      </SectionFooter>
    </Section>
  );
};

interface CheckoutAddressFormProps {
  checkoutId: number;
}

const CheckoutAddressForm: FC<CheckoutAddressFormProps> = ({ checkoutId }) => {
  const actionWithCheckoutId = addAddressToCheckout.bind(null, checkoutId);
  const [result, action] = useFormState(actionWithCheckoutId, null);
  console.log(result);

  return (
    <form action={action}>
      <FormUI />
    </form>
  );
};

export default CheckoutAddressForm;
