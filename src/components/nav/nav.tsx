import type { FC, ReactElement } from "react";
import { cloneElement } from "react";
import cx from "clsx";
import type { NavItem, NavProps } from "./types";
import Link from "next/link";
import Image from "next/image";
import * as icons from "../Icons";

const Nav: FC<NavProps> = ({ items, className }) => (
  <nav className={cx("flex items-center", className)}>
    {items.map((item, index) => {
      if (item && !(item as NavItem).link) {
        return cloneElement(item as ReactElement, { key: index });
      }

      const { link, text, icon, imageUrl, alt } = item as NavItem;
      const IconComp = icon && icons[icon];

      return (
        <Link
          href={link}
          key={link}
          aria-description={text}
          className="mr-8 last:mr-0 flex items-center"
        >
          {imageUrl && <Image src={imageUrl} alt={alt || text} width={24} height={24} className="rounded-full mr-2" />}
          {IconComp && !imageUrl && <IconComp className="mr-2" />}
          {text}
        </Link>
      );
    })}
  </nav>
);

export default Nav;
