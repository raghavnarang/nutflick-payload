import { IconName } from "../Icons/types";

export interface NavItem {
  link: string;
  text: string;
  icon?: IconName;
}

export interface NavProps {
  items: NavItem[];
  className?: string;
  showCart?: boolean;
}
