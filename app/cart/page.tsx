import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import { getCart } from "@/lib/shopify";
import { cookies } from "next/headers";

const Cart = async () => {
  const cartId = cookies().get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-2xl mb-10">Cart</h1>

        {!cart && <EmptyCart />}

        {cart && (
          <div className="flex justify-center items-start lg:flex-row flex-col">
            <div className="lg:w-2/3 lg:mr-10 w-full">
              {cart?.lines.map((line) => (
                <CartItem item={line} key={line.id} />
              ))}
            </div>
            <CartSummary cart={cart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
