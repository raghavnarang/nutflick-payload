"use client";

import Section from "@/components/section";
import type { MinimalAddress } from "@/shared/types/address";
import { FC, useState } from "react";
import CheckoutAddressForm from "./add-edit-form";
import CheckoutAddressPrefilled from "./prefilled";
import SectionFooter from "@/components/section/footer";
import Button from "@/components/button";
import CheckoutSelectAddress from "./select-from-list";

interface CheckoutAddressProps {
  address?: MinimalAddress;
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
  const [selectMode, setSelectMode] = useState(SelectMode.DEFAULT);
  const [editAddress, setEditAddress] = useState<MinimalAddress>();

  if (mode === Mode.SELECT && selectMode === SelectMode.DEFAULT) {
    return (
      <Section title="Delivery Address">
        <CheckoutSelectAddress
          selectedAddressId={address?.id}
          checkoutId={checkoutId}
          onAddNew={() => setSelectMode(SelectMode.ADD)}
          onSuccess={() => {
            setMode(Mode.DEFAULT);
            setSelectMode(SelectMode.DEFAULT);
          }}
          onCancel={() => {
            setMode(Mode.DEFAULT);
            setSelectMode(SelectMode.DEFAULT);
          }}
          onEditAddress={(address) => {
            setEditAddress(address);
            setSelectMode(SelectMode.EDIT);
          }}
        />
      </Section>
    );
  }

  if (
    !address ||
    mode === Mode.EDIT ||
    (mode === Mode.SELECT && selectMode === SelectMode.ADD) ||
    (mode === Mode.SELECT && selectMode === SelectMode.EDIT && editAddress)
  ) {
    return (
      <Section title="Delivery Address">
        <CheckoutAddressForm
          checkoutId={checkoutId}
          address={
            mode === Mode.EDIT
              ? address
              : selectMode === SelectMode.EDIT
              ? editAddress
              : undefined
          }
          onSuccess={() => {
            setMode(Mode.DEFAULT);
            setSelectMode(SelectMode.DEFAULT);
          }}
          onCancel={
            mode !== Mode.DEFAULT
              ? () => {
                  if (mode === Mode.EDIT) setMode(Mode.DEFAULT);
                  setSelectMode(SelectMode.DEFAULT);
                }
              : undefined
          }
        />
      </Section>
    );
  }

  return (
    <Section title="Delivery Address">
      <CheckoutAddressPrefilled address={address} />
      <SectionFooter className="flex gap-3">
        <Button onClick={() => setMode(Mode.EDIT)}>Edit address</Button>
        <Button onClick={() => setMode(Mode.SELECT)}>
          Use another address
        </Button>
      </SectionFooter>
    </Section>
  );
};

export default CheckoutAddress;
