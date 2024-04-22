import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { ensureStartsWith } from "@/lib/utils";
import { Suspense } from "react";
import { ToastProvider } from "@/features/toast";
import { CartProvider } from "@/features/cart";
import ReactQueryProvider from "@/lib/react-query";

const inter = Inter({ subsets: ["latin"] });

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, "@")
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, "https://")
  : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: "summary_large_image",
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
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
            <Suspense>
              <ReactQueryProvider>
                <ToastProvider>
                  <CartProvider>{children}</CartProvider>
                </ToastProvider>
              </ReactQueryProvider>
            </Suspense>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
