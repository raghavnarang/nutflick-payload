import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import Cart from "./Icons/cart";
import { getCart } from "@/lib/shopify";
import { cookies } from "next/headers";

const Header = async () => {
  const cartId = cookies().get("cartId")?.value;

  const cart = cartId ? await getCart(cartId) : undefined;

  const navItems = [
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    { text: `Cart (${cart?.totalQuantity || 0})`, link: "/cart", icon: Cart },
  ];

  return (
    <header className="flex justify-center mb-10">
      <div className="container py-5 flex justify-between border-b border-solid border-gray-300">
        <Link href="/">
          <Image src={logo} alt="Nutflick Logo" width={180} />
        </Link>
        <nav className="flex items-center">
          {navItems.map(({ link, text, icon: IconComp }) => (
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
      </div>
    </header>
  );
};

export default Header;
