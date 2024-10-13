import type { MinimalAddress } from "@/shared/types/address";
import type { FC } from "react";
import SectionBody from "../../section/body";
import SectionFooter from "@/components/section/footer";
import Button from "@/components/button";
import { checkoutLoadingAtom } from "@/features/checkout";
import { useAtomValue } from "jotai";

interface CheckoutAddressPrefilledProps {
  address: MinimalAddress;
  onEdit?: () => void;
  onSelect?: () => void;
}

const CheckoutAddressPrefilled: FC<CheckoutAddressPrefilledProps> = ({
  address: { address, city, state, pincode, name, phone },
  onEdit,
  onSelect,
}) => {
  const isLoading = useAtomValue(checkoutLoadingAtom);

  return (
    <>
      <SectionBody>
        <p className="text-lg mb-2">{name}</p>
        <p>{address}</p>
        <p>
          {city}, {state}, {pincode}
        </p>
        <p>Phone: {phone}</p>
      </SectionBody>
      <SectionFooter className="flex gap-3 flex-col sm:flex-row">
        <Button onClick={onEdit} disabled={isLoading}>
          Edit address
        </Button>
        <Button onClick={onSelect} disabled={isLoading}>
          Use another address
        </Button>
      </SectionFooter>
    </>
  );
};

export default CheckoutAddressPrefilled;
