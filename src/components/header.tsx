import { Suspense, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import type { NavProps } from './nav/types'
import Nav from './nav/nav'
import MobileNav from './nav/mobile-nav'

interface HeaderProps {
  mobileSideNavItems?: NavProps['items']
  navItems?: NavProps['items']
  mobileNavItems?: NavProps['items']
}

const Header: FC<HeaderProps> = ({ mobileNavItems, mobileSideNavItems, navItems }) => (
  <header className="flex justify-center md:mb-10">
    <div className="container py-5 flex justify-between md:border-b border-solid border-gray-300">
      <div className="flex items-center">
        <Suspense>{mobileSideNavItems && <MobileNav items={mobileSideNavItems} />}</Suspense>
        <Link href="/">
          <Image src={logo} alt="Nutflick Logo" className=" w-32 md:w-44" />
        </Link>
      </div>
      {navItems && (
        <div className="md:flex hidden">
          <Nav items={navItems} />
        </div>
      )}
      {mobileNavItems && (
        <div className="md:hidden flex items-center">
          <Nav items={mobileNavItems} />
        </div>
      )}
    </div>
  </header>
)

export default Header
export type { HeaderProps }
