import Body from "@/components/body";
import Header from "@/components/header";
import CartNavItem from "@/components/nav/cart-nav-item";
import { NavProps } from "@/components/nav/types";
import { type FC } from "react";

interface ShopLayoutProps {
  children: React.ReactNode;
}

const ShopLayout: FC<ShopLayoutProps> = ({ children }) => {
  const navItems: NavProps["items"] = [
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    {
      text: "My Account",
      link: "/account",
    },
    <CartNavItem />,
  ];

  return (
    <div>
      <Header navItems={navItems} mobileSideNavItems={navItems} />
      <Body>{children}</Body>
    </div>
  );
};

export default ShopLayout;
