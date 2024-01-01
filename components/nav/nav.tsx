import { FC } from "react";
import cx from "classnames";
import { NavProps } from "./types";
import Link from "next/link";
import * as icons from "../Icons";

const Nav: FC<NavProps> = ({ items, className }) => (
  <nav className={cx("flex items-center", className)}>
    {items.map(({ link, text, icon }) => {
      const IconComp = icon && icons[icon];

      return (
        <Link
          href={link}
          key={link}
          aria-description={text}
          className="mr-8 last:mr-0 flex items-center"
        >
          {IconComp && <IconComp className="mr-2" />}
          {text}
        </Link>
      );
    })}
  </nav>
);

export default Nav;
