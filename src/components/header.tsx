import { Suspense, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import type { NavItem, NavProps } from './nav/types'
import Nav from './nav/nav'
import MobileNav from './nav/mobile-nav'
import MessageStrip from './message-strip'
import { getHeaderSettings } from '@/features/server/header'
import Container from './container'

interface HeaderProps {
  mobileSideNavItems?: NavItem[]
  navItems?: NavProps['items']
  mobileNavItems?: NavProps['items']
}

const Header: FC<HeaderProps> = async ({ mobileSideNavItems, navItems }) => {
  const headerSettings = await getHeaderSettings()

  return (
    <div>
      <div className="md:h-24 h-20">
        <header className="fixed left-0 w-full z-20 bg-white shadow-md">
          <Container innerClassName="flex justify-between">
            <div className="flex items-center">
              <Suspense>{mobileSideNavItems && <MobileNav items={mobileSideNavItems} />}</Suspense>
              <Link href="/">
                <Image src={logo} alt="Nutflick Logo" className="w-32 md:w-44" width={176} />
              </Link>
            </div>
            {navItems && <Nav items={navItems} isHeader />}
          </Container>
          {headerSettings.messageStrip && <MessageStrip message={headerSettings.messageStrip} />}
        </header>
      </div>
    </div>
  )
}

export default Header
export type { HeaderProps }
