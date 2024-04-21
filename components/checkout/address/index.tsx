"use client";

import Section from "@/components/section";
import { Address } from "@/shared/types/address";
import { FC, useState } from "react";
import CheckoutAddressForm from "./add-edit-form";
import CheckoutAddressPrefilled from "./prefilled";
import SectionFooter from "@/components/section/footer";
import Button from "@/components/button";

interface CheckoutAddressProps {
  address?: Address;
  checkoutId: number;
}

enum Mode {
  EDIT,
  SELECT,
  DEFAULT,
}

enum SelectMode {
  EDIT,
  ADD,
  DEFAULT,
}

const CheckoutAddress: FC<CheckoutAddressProps> = ({ address, checkoutId }) => {
  const [mode, setMode] = useState(Mode.DEFAULT);
  const [selectMode, setSelectMode] = useState(Mode.DEFAULT);

  if(mode === Mode.SELECT) {

  }

  if (!address || mode === Mode.EDIT) {
    return (
      <Section title="Delivery Address">
        <CheckoutAddressForm
          checkoutId={checkoutId}
          address={address}
          onSuccess={() => setMode(Mode.DEFAULT)}
        />
      </Section>
    );
  }

  return (
    <Section title="Delivery Address">
      <CheckoutAddressPrefilled address={address} />
      <SectionFooter className="flex justify-end gap-3">
        <Button onClick={() => setMode(Mode.EDIT)}>Edit address</Button>
        <Button>Use another address</Button>
      </SectionFooter>
    </Section>
  );
};

export default CheckoutAddress;
