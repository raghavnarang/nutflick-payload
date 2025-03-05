import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import type { NavProps } from '@/components/nav/types'
import { CartProvider } from '@/features/cart/cart-store/provider'
import VariantSelectorModal from '@/components/cart/variant-selector/modal'
import CartNavItem from '@/components/nav/cart-nav-item'
import ToastContainer from '@/features/toast/components/toast-container'
import clsx from 'clsx'
import GlobalWrapper from '@/components/global-wrapper'
import type { Metadata } from 'next'
import favicon from '@/public/favicon.png'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!
export const metadata: Metadata = {
  robots: {
    follow: true,
    index: true,
  },
  icons: {
    icon: favicon.src,
  },
  metadataBase: new URL(baseUrl),
  title: 'Nutflick',
}

const navItems: NavProps['items'] = [
  { text: 'Home', link: '/' },
  {
    text: 'My Account',
    link: '/account',
    icon: 'User',
  },
  <CartNavItem
    key="cart"
    className="md:h-16 h-12 md:pl-5 pl-3 border-gray-300 items-center"
  />,
]

const mobileNavItems = [
  { text: 'Privacy Policy', link: '/page/privacy-policy' },
  { text: 'Terms & Conditions', link: '/page/tnc' },
  {
    text: 'Refund/Cancelation Policy',
    link: '/page/refund-and-cancellation-policy',
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'text-gray-700')}>
        <Script defer data-domain="nuflick.com" src="https://plausible.io/js/script.js" />
        <CartProvider>
          <GlobalWrapper>
            <div>
              <Header navItems={navItems} mobileSideNavItems={mobileNavItems} />
              {children}
            </div>
            <Footer />
            <VariantSelectorModal />
            <ToastContainer />
          </GlobalWrapper>
        </CartProvider>

        <Script
          id='fbpixel'
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1289598632184694');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1289598632184694&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  )
}
