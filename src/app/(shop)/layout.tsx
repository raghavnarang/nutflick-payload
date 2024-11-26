import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import Body from '@/components/body'
import Header from '@/components/header'
import type { NavProps } from '@/components/nav/types'
import { CartProvider } from '@/features/cart/cart-store/provider'
import VariantSelectorModal from '@/components/cart/variant-selector/modal'
import CartNavItem from '@/components/nav/cart-nav-item'
import ToastContainer from '@/features/toast/components/toast-container'
import clsx from 'clsx'
import FooterQuickActions from '@/components/quick-actions/footer'
import GlobalWrapper from '@/components/global-wrapper'
import type { Metadata } from 'next'
import favicon from '@/public/favicon.png'

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
  },
  <CartNavItem key="cart" />,
]

const mobileNavItems = [
  ...navItems,
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
        <CartProvider>
          <GlobalWrapper>
            <div>
              <Header navItems={navItems} mobileSideNavItems={mobileNavItems} />
              <Body>{children}</Body>
            </div>
            <Footer />
            <VariantSelectorModal />
            <ToastContainer />
            <FooterQuickActions />
          </GlobalWrapper>
        </CartProvider>
      </body>
    </html>
  )
}
