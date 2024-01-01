import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import HeaderNav from "./nav/header-nav";
import HeaderMobileNav from "./nav/header-mobile-nav";
import CartNavItem from "./nav/cart-nav-item";

const Header = async () => (
  <header className="flex justify-center mb-10">
    <div className="container py-5 flex justify-between border-b border-solid border-gray-300">
      <div className="flex items-center">
        <Suspense>
          <HeaderMobileNav />
        </Suspense>
        <Link href="/">
          <Image src={logo} alt="Nutflick Logo" className=" w-32 md:w-44" />
        </Link>
      </div>
      <Suspense>
        <div className="md:flex hidden">
          <HeaderNav />
        </div>
      </Suspense>
      <Suspense>
        <div className="md:hidden flex items-center">
          <CartNavItem />
        </div>
      </Suspense>
    </div>
  </header>
);

export default Header;
