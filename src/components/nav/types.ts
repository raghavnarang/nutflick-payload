import type { ReactElement } from "react";
import type { IconName } from "../Icons/types";

export interface NavItem {
  link: string;
  text: string;
  icon?: IconName;
  imageUrl?: string;
  alt?: string;
}

export interface NavProps {
  items: Array<NavItem | ReactElement>;
  className?: string;
  showCart?: boolean;
}
