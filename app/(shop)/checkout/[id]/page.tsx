import EmptyCart from "@/components/cart/empty-cart";
import CheckoutAddress from "@/components/checkout/address";
import CheckoutPaymentButton from "@/components/checkout/payment-button";
import CheckoutProduct from "@/components/checkout/product";
import SyncProductsToLS from "@/components/checkout/product/sync-ls";
import CheckoutShipping from "@/components/checkout/shipping";
import CheckoutTotal from "@/components/checkout/total";
import Section from "@/components/section";
import SectionLoader from "@/components/section/loader";
import { CheckoutProvider } from "@/features/checkout";
import { getCheckout } from "@/features/server/checkout";
import { Suspense, type FC } from "react";

interface CheckoutProps {
  params: { id: string };
}

const Checkout: FC<CheckoutProps> = async ({ params: { id } }) => {
  const {
    address,
    items,
    shipping_mode: shippingMode,
  } = await getCheckout(+id);

  if (items.length === 0) {
    return (
      <>
        <SyncProductsToLS items={[]} />
        <EmptyCart />
      </>
    );
  }

  const subtotal = items.reduce(
    (carry, item) => carry + item.price * item.qty,
    0
  );

  return (
    <CheckoutProvider subtotal={subtotal || 0} defaultLoading={true}>
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <h1 className="text-2xl mb-10">Checkout</h1>
          <div className="flex justify-center items-start lg:flex-row flex-col lg:gap-10">
            <div className="lg:w-2/3 w-full">
              <CheckoutAddress
                checkoutId={+id}
                address={address || undefined}
              />
            </div>
            <div className="lg:w-1/3 w-full">
              <Section title="Order Details">
                {items.map((item) => (
                  <CheckoutProduct key={item.variantId} {...item} />
                ))}
                <Suspense
                  fallback={<SectionLoader text="Calculating Shipping" />}
                >
                  {address && (
                    <CheckoutShipping
                      address={address}
                      items={items}
                      selected={shippingMode || undefined}
                    />
                  )}
                </Suspense>
                <CheckoutTotal />
                <SyncProductsToLS
                  items={items.map((i) => {
                    const { weight, costToBear, ...rest } = i;
                    return rest;
                  })}
                />
              </Section>
              <CheckoutPaymentButton />
            </div>
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default Checkout;
