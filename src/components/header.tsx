import { Suspense, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import type { NavItem, NavProps } from './nav/types'
import Nav from './nav/nav'
import MobileNav from './nav/mobile-nav'

interface HeaderProps {
  mobileSideNavItems?: NavItem[]
  navItems?: NavProps['items']
  mobileNavItems?: NavProps['items']
}

const Header: FC<HeaderProps> = ({ mobileSideNavItems, navItems }) => (
  <div>
    <div className="md:h-16 h-12">
      <header className="flex justify-center fixed left-0 w-full z-20 bg-white px-3 xl:px-0 border-b border-solid border-gray-300">
        <div className="container flex justify-between">
          <div className="flex items-center">
            <Suspense>{mobileSideNavItems && <MobileNav items={mobileSideNavItems} />}</Suspense>
            <Link href="/">
              <Image src={logo} alt="Nutflick Logo" className="w-32 md:w-44" width={176} />
            </Link>
          </div>
          {navItems && <Nav items={navItems} isHeader />}
        </div>
      </header>
    </div>
  </div>
)

export default Header
export type { HeaderProps }
