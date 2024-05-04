import Radio from "@/components/form/radio";
import Price from "@/components/product/price";
import SectionBody from "@/components/section/body";
import SectionRadio from "@/components/section/radio";
import ShowToast from "@/components/show-toast";
import { getOrderShippingItems } from "@/lib/shiprocket";
import { MinimalAddress } from "@/shared/types/address";
import { CartProduct } from "@/shared/types/cart";
import { ShippingMode } from "@/shared/types/shipping";
import { FC } from "react";

interface CheckoutShippingSelectorProps {
  address: MinimalAddress;
  items: CartProduct[];
}

const CheckoutShippingSelector: FC<CheckoutShippingSelectorProps> = async ({
  address,
  items,
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
      {couriers.map((i, index) => (
        <SectionRadio
          name="shipping_mode"
          key={i.mode}
          value={i.mode}
          id={i.mode}
          defaultChecked={index === 0}
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
      <ShowToast toast={toast} showErrorOnly />
    </>
  );
};

export default CheckoutShippingSelector;
