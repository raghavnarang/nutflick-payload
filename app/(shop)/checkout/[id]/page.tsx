import Button from "@/components/button";
import CheckoutAddress from "@/components/checkout/address";
import Section from "@/components/section";
import SectionBody from "@/components/section/body";
import { getCheckout } from "@/features/server/checkout";
import type { FC } from "react";

interface CheckoutProps {
  params: { id: string };
}

const Checkout: FC<CheckoutProps> = async ({ params: { id } }) => {
  const { address, items } = await getCheckout(+id);
  console.log(items);
  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl mb-10">Checkout</h1>
        <div className="flex justify-center items-start lg:flex-row flex-col lg:gap-10">
          <div className="lg:w-2/3 w-full">
            <CheckoutAddress checkoutId={+id} address={address || undefined} />
          </div>
          <div className="lg:w-1/3 w-full">
            <Section title="Order Details">
              <SectionBody></SectionBody>
            </Section>
            <Button large type="submit">
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
