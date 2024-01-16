import Body from "@/components/body";
import Header from "@/components/header";
import CartNavItem from "@/components/nav/cart-nav-item";
import CartNavItemUI from "@/components/nav/cart-nav-item-ui";
import { NavProps } from "@/components/nav/types";
import { ToastProvider } from "@/features/toast";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
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
  const user = await currentUser();

  const navItems: NavProps["items"] = [
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    {
      text: "My Account",
      link: "/account",
      imageUrl: user?.imageUrl,
      alt: user?.firstName || undefined,
      icon: "User",
    },
    <CartItemWithSuspense />,
  ];

  return (
    <ClerkProvider>
      <Header navItems={navItems} />
      <Body>
        <ToastProvider>{children}</ToastProvider>
      </Body>
    </ClerkProvider>
  );
};

export default ShopLayout;
