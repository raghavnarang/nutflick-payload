import Body from "@/components/body";
import Header from "@/components/header";
import { type FC } from "react";

interface ShopLayoutProps {
  children: React.ReactNode;
}

const OrderLayout: FC<ShopLayoutProps> = ({ children }) => (
  <div>
    <Header />
    <Body>{children}</Body>
  </div>
);

export default OrderLayout;
