import Link from 'next/link'

export default function AccountQuickAction() {
  return (
    <Link href="/account" className="border-solid border-r border-gray-100 h-14 flex items-center justify-center px-4">
      Account
    </Link>
  )
}
