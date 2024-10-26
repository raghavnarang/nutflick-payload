import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import { Suspense } from 'react'
import FooterNav from './nav/footer-nav'

const year = new Date().getFullYear()

const Footer = () => (
  <footer className="flex justify-center mt-10">
    <div className="container py-3 flex justify-between border-t border-solid border-gray-300 flex-col-reverse lg:flex-row">
      <span className="lg:w-1/3 w-full text-sm text-center lg:text-left block items-center lg:flex">
        Copyright &copy; {year} Nutflick. All Rights Reserved
      </span>
      <Link
        href="/"
        className="lg:w-1/3 w-full flex justify-center items-center mb-3 md:my-3 lg:my-0"
      >
        <Image src={logo} alt="Nutflick Logo" width={100} />
      </Link>
      <div className="md:flex hidden lg:w-1/3 lg:justify-end md:justify-center">
        <FooterNav />
      </div>
    </div>
  </footer>
)

export default Footer
