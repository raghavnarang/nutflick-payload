import ShowToast from "@/components/show-toast";
import { getOrderShippingItems } from "@/lib/shiprocket";
import { MinimalAddress } from "@/shared/types/address";
import { CartProduct } from "@/shared/types/cart";
import { ShippingMode } from "@/shared/types/shipping";
import { FC } from "react";
import CheckoutShippingSelector from "./selector";

interface CheckoutShippingProps {
  address: MinimalAddress;
  items: CartProduct[];
  selected?: ShippingMode
}

const CheckoutShipping: FC<CheckoutShippingProps> = async ({
  address,
  items,
  selected
}) => {
  const { weight, costToBear } = items.reduce(
    (c, i) => ({
      weight: c.weight + i.qty * (i.weight || 0),
      costToBear: c.costToBear + i.qty * (i.costToBear || 0),
    }),
    {
      weight: 0,
      costToBear: 0,
    }
  );

  if (!weight) {
    return null;
  }

  const { couriers, ...toast } = await getOrderShippingItems(
    process.env.SHIPPING_FROM_PIN!,
    address?.pincode,
    weight,
    costToBear
  );

  return (
    <>
      <CheckoutShippingSelector couriers={couriers} selected={selected} />
      <ShowToast toast={toast} showErrorOnly />
    </>
  );
};

export default CheckoutShipping;
