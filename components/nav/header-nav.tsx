import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import Nav from "./nav";
import { NavItem } from "./types";

const HeaderNav = async () => {
  const cartId = cookies().get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  const navItems: NavItem[] = [
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    { text: `Cart (${cart?.totalQuantity || 0})`, link: "/cart", icon: "Cart" },
  ];

  return <Nav items={navItems} />;
};

export default HeaderNav;
