import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Body from "@/components/body";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Dry Fruits & Nuts in India - Nutflick",
  description:
    "Get healthy and quality snack of all time, at lowest price, delivered at your doorstep. Get best dry fruits and nuts delivered at your doorstep anywhere in India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between min-h-screen px-5">
          <div>
            <Header />
            <Body>{children}</Body>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
