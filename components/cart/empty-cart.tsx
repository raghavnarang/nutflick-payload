import Link from "next/link";
import BigMessage from "../big-message";
import Cart from "../Icons/cart";

const EmptyCart = () => (
  <BigMessage icon={Cart} button={{ text: <Link href="/">Go to Home</Link> }}>
    No Items in Cart. Go to home & add some items in cart to proceed.
  </BigMessage>
);

export default EmptyCart;
