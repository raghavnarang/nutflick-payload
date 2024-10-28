import Button from '@/components/button'
import Back from '@/components/Icons/back'
import Link from 'next/link'

interface MyAccountHeaderProps {
  title: string
  backLink?: string
  email: string
}

export default function MyAccountHeader({ title, backLink, email }: MyAccountHeaderProps) {
  return (
    <div className="flex justify-between md:items-center md:mb-10 mb-5 flex-col md:flex-row gap-3">
      <div className="flex items-center gap-3">
        {backLink && (
          <Link href={backLink} className="inline-block">
            <Back />
          </Link>
        )}
        <h1 className="text-2xl">{title}</h1>
      </div>
      <div className="flex gap-4 md:items-center flex-col md:flex-row items-start">
        <p>Welcome, {email} </p>
        <Link href="/logout">
          <Button small isSecondary>
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )
}
