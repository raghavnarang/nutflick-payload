import Body from "@/components/body";
import Header from "@/components/header";
import CartNavItem from "@/components/nav/cart-nav-item";
import CartNavItemUI from "@/components/nav/cart-nav-item-ui";
import { NavProps } from "@/components/nav/types";
import { ToastProvider } from "@/features/toast";
import { Suspense, type FC } from "react";

interface ShopLayoutProps {
  children: React.ReactNode;
}

const CartItemWithSuspense = () => (
  <Suspense fallback={<CartNavItemUI />}>
    <CartNavItem />
  </Suspense>
);

const ShopLayout: FC<ShopLayoutProps> = async ({ children }) => {
  const navItems: NavProps["items"] = [
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    {
      text: "My Account",
      link: "/account",
    },
    <CartItemWithSuspense key='cartItem' />,
  ];

  return (
    <div>
      <Header navItems={navItems} mobileSideNavItems={navItems} />
      <Body>
        <ToastProvider>{children}</ToastProvider>
      </Body>
    </div>
  );
};

export default ShopLayout;
