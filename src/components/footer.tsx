import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import { Suspense } from 'react'
import FooterNav from './nav/footer-nav'
import Container from './container'
import ChevronRight from './Icons/chevron-right'

const year = new Date().getFullYear()

const footerLinks = [
  { text: 'Privacy Policy', link: '/page/privacy-policy' },
  { text: 'Terms & Conditions', link: '/page/tnc' },
  {
    text: 'Refund/Cancelation Policy',
    link: '/page/refund-and-cancellation-policy',
  },
]

const Footer = () => (
  <footer className="border-t-8 border-primary md:mt-10 mt-5">
    <Container className="md:py-10 py-5">
      <div className="grid md:grid-cols-3 md:gap-10 gap-5 grid-cols-1">
        {/* About Nutflick */}
        <div className="flex flex-col md:gap-5 gap-3">
          <Link href="/">
            <Image src={logo} alt="Nutflick Logo" width={200} className="md:w-48 w-36" />
          </Link>
          <p className="leading-relaxed font-medium text-sm md:text-base">
            Nutflick offers premium dry fruits and nuts, including almonds, cashews, and raisins,
            sourced for unmatched freshness and quality. As India’s trusted brand, we deliver
            healthy, delicious snacks to elevate your lifestyle. Choose Nutflick for the finest dry
            fruits, crafted for taste and nutrition!
          </p>
          <p className="font-semibold text-sm md:text-base">FSSAI: 12123002000086</p>
        </div>
        {/* Address & Contact */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="md:mb-2 mb-1 text-primary font-semibold md:text-lg text-base">Address</p>
            <p className="text-sm md:text-base">
              Second Floor, 1028/6-5, Bazar Ganda Wala, Majith Mandi, Amritsar, Punjab, 143001
            </p>
          </div>
          <div>
            <p className="md:mb-2 mb-1 text-primary font-semibold md:text-lg text-base">Contact</p>
            <p>
              <Link
                href="tel:7340803995"
                className="flex gap-1 items-center font-medium text-sm md:text-base"
              >
                +91-7340803995 <ChevronRight className="!size-5" />
              </Link>
              <span className="text-sm">(Call or WhatsApp)</span>
            </p>
          </div>
        </div>
        {/* Instagram & Useful Links */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="md:mb-2 mb-1 text-primary font-semibold md:text-lg text-base">
              Instagram
            </p>
            <Link
              href="https://www.instagram.com/nutflick.india/"
              target="_blank"
              className="flex gap-1 items-center font-medium text-sm md:text-base"
            >
              @nutflick.india <ChevronRight className="!size-5" />
            </Link>
          </div>
          <div>
            <p className="md:mb-2 mb-1 text-primary font-semibold md:text-lg text-base">
              Useful Links
            </p>
            <ul className="list-disc font-medium pl-5 text-sm md:text-base">
              {footerLinks.map((link) => (
                <li key={link.link}>
                  <Link href={link.link} className="leading-relaxed">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
    <p className="text-center text-sm border-t border-gray-300 leading-10 font-medium">
      Copyright &copy; {year} Nutflick. All Rights Reserved
    </p>
  </footer>
)

export default Footer
