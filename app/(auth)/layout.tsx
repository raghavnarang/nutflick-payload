import Body from "@/components/body";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => (
  <Body>
    <div className="w-full flex justify-center p-24">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-10">
        <Link href="/" className="mb-8 block">
          <Image src={logo} width={150} alt="Nutflick" />
        </Link>
        {children}
      </div>
    </div>
  </Body>
);

export default AuthLayout;
