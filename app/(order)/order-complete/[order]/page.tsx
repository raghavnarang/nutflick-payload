import { getOrderPaymentStatus } from "@/features/server/order";

const OrderComplete = async ({
  params: { order },
}: {
  params: { order: string };
}) => {
  return <p>{await getOrderPaymentStatus(+order, true)}</p>;
};
export default OrderComplete;
