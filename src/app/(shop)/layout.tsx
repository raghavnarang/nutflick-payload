import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import { Suspense } from 'react'
import Body from '@/components/body'
import Header from '@/components/header'
import type { NavProps } from '@/components/nav/types'
import { CartProvider } from '@/features/cart/cart-store/provider'
import VariantSelectorModal from '@/components/cart/variant-selector/modal'
import CartNavItem from '@/components/nav/cart-nav-item'
import ToastContainer from '@/features/toast/components/toast-container'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Nutflick',
    template: `%s | Nutflick`,
  },
  robots: {
    follow: true,
    index: true,
  },
}

const navItems: NavProps['items'] = [
  { text: 'About Us', link: '/about' },
  { text: 'Contact Us', link: '/contact' },
  {
    text: 'My Account',
    link: '/account',
  },
  <CartNavItem />,
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col justify-between min-h-screen px-5">
            <div>
              <Header navItems={navItems} mobileSideNavItems={navItems} />
              <Body>{children}</Body>
            </div>
            <Footer />
            <VariantSelectorModal />
            <ToastContainer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
