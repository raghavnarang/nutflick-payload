import { Address } from "@/shared/types/address";
import { FC } from "react";
import SectionBody from "../../section/body";

interface CheckoutAddressPrefilledProps {
  address: Address;
}

const CheckoutAddressPrefilled: FC<CheckoutAddressPrefilledProps> = ({
  address: { address, city, state, pincode, name, phone },
}) => {
  return (
    <SectionBody>
      <p className="text-lg mb-2">
        {name}
      </p>
      <p>{address}</p>
      <p>
        {city}, {state}, {pincode}
      </p>
      <p>Phone: {phone}</p>
    </SectionBody>
  );
};

export default CheckoutAddressPrefilled;
