import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import logo from "../public/logo.png";

const navItems = [
  { text: "Privacy Policy", link: "/privacy-policy" },
  { text: "Terms & Conditions", link: "/tnc" },
  {
    text: "Refund/Cancelation Policy",
    link: "/refund-cancel-policy",
  },
];

const year = new Date().getFullYear();

const Footer = () => (
  <footer className="flex justify-center mt-10">
    <div className="container py-3 flex justify-between border-t border-solid border-gray-300">
      <span className="w-1/3 flex items-center text-sm">
        Copyright &copy; {year} Nutflick. All Rights Reserved
      </span>
      <Link href="/" className="w-1/3 flex justify-center items-center">
        <Image src={logo} alt="Nutflick Logo" width={100} />
      </Link>
      <Nav items={navItems} className="w-1/3 justify-end text-sm" />
    </div>
  </footer>
);

export default Footer;
