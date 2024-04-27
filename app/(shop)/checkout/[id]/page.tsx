import Button from "@/components/button";
import EmptyCart from "@/components/cart/empty-cart";
import CheckoutAddress from "@/components/checkout/address";
import CheckoutProduct from "@/components/checkout/product";
import SyncProductsToLS from "@/components/checkout/product/sync-ls";
import Price from "@/components/product/price";
import Section from "@/components/section";
import SectionTitleValue from "@/components/section/title-value";
import { getCheckout } from "@/features/server/checkout";
import type { FC } from "react";

interface CheckoutProps {
  params: { id: string };
}

const Checkout: FC<CheckoutProps> = async ({ params: { id } }) => {
  const { address, items } = await getCheckout(+id);

  if (items.length === 0) {
    return (
      <>
        <SyncProductsToLS items={[]} />
        <EmptyCart />
      </>
    );
  }

  const price = items.reduce((carry, item) => carry + item.price * item.qty, 0);

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
              {items.map((item) => (
                <CheckoutProduct key={item.variantId} {...item} />
              ))}
              <SectionTitleValue title="Total">
                <Price price={price} />
              </SectionTitleValue>
              <SyncProductsToLS items={items} />
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
