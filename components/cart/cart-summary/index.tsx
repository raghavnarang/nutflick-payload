import Price from "@/components/product/price";
import type { Cart } from "@/lib/shopify/types";
import type { FC } from "react";
import DiscountTag from "./discount-tag";
import ApplyDiscount from "./apply-discount";
import Link from "next/link";
import Button from "@/components/button";

interface CartSummaryProps {
  cart: Cart;
}

const CartSummary: FC<CartSummaryProps> = ({ cart }) => {
  const validDiscountCodes = cart.discountCodes
    .filter((discount) => discount.applicable)
    .map((discount) => discount.code);

  const totalDiscount = cart.discountAllocations.reduce(
    (total, discount) => total + parseFloat(discount.discountedAmount.amount),
    0
  );

  return (
    <div className="lg:w-1/3 w-full">
      <div className="bg-gray-50 rounded-lg mb-5">
        <header className="md:px-8 px-4 h-16 flex items-center border-b border-solid border-gray-300">
          <span className="text-lg">Cart Summary</span>
        </header>
        <div className="md:px-8 px-4 h-16 border-b border-solid border-gray-200 flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <Price price={parseFloat(cart.cost.subtotalAmount.amount)} />
        </div>
        <div className="md:px-8 px-4 h-16 border-b border-solid border-gray-200 flex text-gray-600">
          <ApplyDiscount />
        </div>
        {validDiscountCodes.length > 0 && (
          <div className="md:px-8 px-4 py-3 min-h-[64px] border-b border-solid border-gray-200 flex justify-between items-center">
            <div className="flex flex-wrap gap-2 mr-4">
              {validDiscountCodes.map((code) => (
                <DiscountTag code={code} key={code} />
              ))}
            </div>
            <Price className="text-gray-600" negative price={totalDiscount} />
          </div>
        )}
        <div className="md:px-8 px-4 h-16 border-b border-solid border-gray-200 flex justify-between items-center text-gray-600">
          <span>Taxes</span>
          <div className="flex flex-col items-end justify-center">
            <span>Included in Subtotal</span>
            <span className="text-xs">(More info on Checkout)</span>
          </div>
        </div>
        <div className="md:px-8 px-4 h-16 flex justify-between items-center">
          <span className="text-gray-600">Total</span>
          <Price
            className="text-lg"
            price={parseFloat(cart.cost.totalAmount.amount)}
          />
        </div>
      </div>
      <Button large>
        <Link href={cart.checkoutUrl}>Proceed to Checkout</Link>
      </Button>
    </div>
  );
};

export default CartSummary;
