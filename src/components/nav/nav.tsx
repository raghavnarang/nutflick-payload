import type { FC, ReactElement } from 'react'
import { cloneElement } from 'react'
import cx, { clsx } from 'clsx'
import type { NavItem, NavProps } from './types'
import Link from 'next/link'
import Image from 'next/image'
import * as icons from '../Icons'

const Nav: FC<NavProps> = ({ items, className, isHeader }) => (
  <nav className={cx('flex items-center', className)}>
    {items.map((item, index) => {
      if (item && !(item as NavItem).link) {
        return cloneElement(item as ReactElement, { key: index })
      }

      const { link, text, icon, imageUrl, alt } = item as NavItem
      const IconComp = icon && icons[icon]

      return (
        <Link
          href={link}
          key={link}
          aria-description={text}
          className={clsx('flex items-center', {
            'md:h-16 h-12 md:px-5 px-3 border-r border-gray-300': isHeader,
            'mr-8 last:mr-0': !isHeader,
            'md:flex hidden': isHeader && !IconComp,
          })}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={alt || text}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
          )}
          {IconComp && !imageUrl && <IconComp className={clsx({ 'md:hidden': isHeader })} />}
          <span className={clsx({ 'md:block hidden': isHeader })}>{text}</span>
        </Link>
      )
    })}
  </nav>
)

export default Nav
