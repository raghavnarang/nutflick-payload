import BigMessage from "@/components/big-message";
import { initiateOrder } from "@/features/server/actions/order";
import { Status } from "@/shared/types/status";
import { Error } from "@/components/Icons";
import StartPayment from "@/components/order/start-payment";

const PlaceOrder = async () => {
  const result = await initiateOrder();

  if (result?.status === Status.error) {
    return (
      <BigMessage
        icon={Error}
        button={{ text: "Go to home", link: { href: "/", replace: true } }}
      >
        Something went wrong while placing your order.
      </BigMessage>
    );
  }

  return (
    <>
      {result.status === Status.success && result.order && (
        <StartPayment {...result.order} />
      )}
    </>
  );
};

export default PlaceOrder;
