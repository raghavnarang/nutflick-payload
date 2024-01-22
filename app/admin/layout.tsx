import Body from "@/components/body";
import Header from "@/components/header";
import type { NavItem } from "@/components/nav/types";
import type { FC } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems: NavItem[] = [
  { text: "Products", link: "/admin" },
  { text: "Orders", link: "/admin/orders" },
];

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => (
  <div>
    <Header navItems={navItems} mobileNavItems={navItems} />
    <Body>{children}</Body>
  </div>
);

export default AdminLayout;