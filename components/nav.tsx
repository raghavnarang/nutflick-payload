import type { FC } from "react";
import Link from "next/link";
import cx from "classnames";
import type { Icon } from "./Icons/types";

interface NavItem {
  link: string;
  text: string;
  icon?: FC<Icon>;
}

interface NavProps {
  items: NavItem[];
  className?: string;
}

const Nav: FC<NavProps> = ({ items, className }) => (
  <nav className={cx("flex items-center", className)}>
    {items.map(({ link, text, icon: IconComp }) => (
      <Link
        href={link}
        key={link}
        aria-description={text}
        className="mr-8 last:mr-0 flex items-center"
      >
        {IconComp && <IconComp className="mr-2" />}
        {text}
      </Link>
    ))}
  </nav>
);

export default Nav;
export type { NavProps, NavItem };
