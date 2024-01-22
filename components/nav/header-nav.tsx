import Nav from "./nav";
import type { NavItem } from "./types";
import { Suspense, type ReactElement } from "react";
import CartNavItemUI from "./cart-nav-item-ui";
import CartNavItem from "./cart-nav-item";

const HeaderNav = async () => {
  const navItems: Array<NavItem | ReactElement> = [
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    { text: "My Account", link: "/account" },
    <Suspense fallback={<CartNavItemUI />}>
      <CartNavItem />
    </Suspense>,
  ];

  return <Nav items={navItems} />;
};

export default HeaderNav;
