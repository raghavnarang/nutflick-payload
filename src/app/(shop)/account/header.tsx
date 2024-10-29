import Button from '@/components/button'
import Back from '@/components/Icons/back'
import Link from 'next/link'

interface MyAccountHeaderProps {
  title: string
  backLink?: string
  email: string
  titleButton?: {
    link: string
    text: string
  }
}

export default function MyAccountHeader({
  title,
  backLink,
  email,
  titleButton,
}: MyAccountHeaderProps) {
  return (
    <div className="flex justify-between md:items-center md:mb-10 mb-5 flex-col-reverse md:flex-row gap-3">
      <div className="flex gap-3 items-center md:flex-row flex-col">
        <div className="flex items-center gap-3">
          {backLink && (
            <Link href={backLink} className="inline-block">
              <Back />
            </Link>
          )}
          <h1 className="md:text-2xl text-xl">{title}</h1>
        </div>
        {titleButton && (
          <Link href={titleButton.link}>
            <Button type="button" isInfo small>
              {titleButton.text}
            </Button>
          </Link>
        )}
      </div>
      <div className="flex gap-3 items-center md:flex-row flex-col">
        <p className="text-sm md:text-base">Welcome, {email} </p>
        <Link href="/logout">
          <Button small isSecondary>
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )
}
