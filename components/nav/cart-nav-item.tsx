import { cookies } from "next/headers";
import CartNavItemUI from "./cart-nav-item-ui";
import { getCart } from "@/lib/shopify";

const CartNavItem = async ({ onlyIcon = false }: { onlyIcon?: boolean }) => {
  const cartId = cookies().get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  return <CartNavItemUI quantity={cart?.totalQuantity} onlyIcon={onlyIcon} />;
};

export default CartNavItem;
