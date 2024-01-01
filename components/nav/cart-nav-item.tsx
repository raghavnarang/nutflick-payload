import { getCart } from "@/lib/shopify";
import { cookies } from "next/headers";
import Link from "next/link";
import { Cart } from "../Icons";

const CartNavItem = async () => {
  const cartId = cookies().get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  return (
    <Link href="/cart" className="mr-8 last:mr-0 relative flex">
      <Cart className="mr-1" />
      <span className="text-xs size-6 bg-red-500 rounded-full text-white flex items-center justify-center">
        {cart?.totalQuantity || 0}
      </span>
    </Link>
  );
};

export default CartNavItem;
