import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import MobileNav from "./mobile-nav";
import { NavItem } from "./types";

const HeaderMobileNav = async () => {
  const cartId = cookies().get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  const navItems: NavItem[] = [
    { text: `Cart (${cart?.totalQuantity || 0})`, link: "/cart", icon: "Cart" },
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    { text: "Privacy Policy", link: "/privacy-policy" },
    { text: "Terms & Conditions", link: "/tnc" },
    {
      text: "Refund/Cancelation Policy",
      link: "/refund-cancel-policy",
    },
  ];

  return <MobileNav items={navItems} />;
};

export default HeaderMobileNav;
