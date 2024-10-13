"use client";

import { Error } from "@/components/Icons";
import Back from "@/components/Icons/back";
import LoadingAnimated from "@/components/Icons/loading-animated";
import BigMessage from "@/components/big-message";
import Button from "@/components/button";
import SectionBody from "@/components/section/body";
import SectionFooter from "@/components/section/footer";
import { selectAddressForCheckout } from "@/features/server/actions/checkout/address";
import { getUserAddresses } from "@/features/server/checkout/address";
import { useToast } from "@/features/toast";
import { Status } from "@/shared/types/status";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type FC, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import cx from "classnames";
import { MinimalAddress } from "@/shared/types/address";
import Edit from "@/components/Icons/edit";
import { checkoutLoadingAtom } from "@/features/checkout";
import { useAtom } from "jotai";

interface CheckoutSelectAddress {
  selectedAddressId?: number;
  onAddNew?: () => void;
  checkoutId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
  onEditAddress?: (address: MinimalAddress) => void;
}

const FormUI: FC<Omit<CheckoutSelectAddress, "checkoutId">> = ({
  selectedAddressId,
  onAddNew,
  onCancel,
  onEditAddress,
}) => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(selectedAddressId);
  const [ checkoutLoading, setLoading ] = useAtom(checkoutLoadingAtom);
  const { pending: formLoading } = useFormStatus();

  useEffect(() => {
    if (formLoading) setLoading(true);
  }, [formLoading]);

  const pending = formLoading || checkoutLoading;

  const {
    data: addresses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getUserAddresses(),
  });

  useEffect(() => {
    if (!selected && addresses && addresses.length > 0) {
      setSelected(addresses[0].id);
    }
  }, [addresses, selected]);

  if (isLoading) {
    return (
      <SectionBody className="flex justify-center items-center h-32">
        <LoadingAnimated />
      </SectionBody>
    );
  }

  if (isError || !addresses || addresses.length === 0) {
    return (
      <SectionBody>
        <BigMessage
          icon={Error}
          button={{
            text: "Try Again",
            onClick: () => {
              queryClient.invalidateQueries({ queryKey: ["addresses"] });
            },
          }}
        >
          Something Went Wrong. Unable to load addresses.
        </BigMessage>
      </SectionBody>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        {addresses.map((address) => (
          <div
            className={cx(
              "flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between border-t first:border-none border-gray-200 p-4 hover:bg-white transition-colors",
              { "!bg-red-100 !hover:bg-red-100": selected === address.id }
            )}
            key={address.id}
            onClick={() => setSelected(address.id)}
          >
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                name="id"
                id={`address-${address.id}`}
                value={address.id}
                checked={selected === address.id}
                onChange={() => setSelected(address.id)}
                disabled={pending}
              />
              <label htmlFor={`address-${address.id}`}>
                <p>
                  <b>{address.name}</b> - {address.phone}
                </p>
                <p>
                  {address.address}, {address.city}, {address.state},{" "}
                  {address.pincode}
                </p>
              </label>
            </div>
            <Button
              small
              onClick={(e) => {
                e.preventDefault();
                onEditAddress?.(address);
              }}
              icon={Edit}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
      <SectionFooter className="flex sm:flex-row flex-col gap-3">
        <Button type="submit" disabled={pending}>
          Use this Address
        </Button>
        <Button
          disabled={pending}
          onClick={(e) => {
            e.preventDefault();
            onAddNew?.();
          }}
        >
          Add New
        </Button>
        {onCancel && (
          <Button
            isSecondary
            disabled={pending}
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

const CheckoutSelectAddress: FC<CheckoutSelectAddress> = (props) => {
  const { checkoutId, onSuccess } = props;
  const actionWithCheckoutId = selectAddressForCheckout.bind(null, checkoutId);
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
      <FormUI {...props} />
    </form>
  );
};

export default CheckoutSelectAddress;
