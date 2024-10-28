import Link from 'next/link'
import ChevronRight from '../Icons/chevron-right'

export default function LinkCard({
  title,
  description,
  link,
}: {
  title: string
  description: string
  link: string
}) {
  return (
    <Link href={link}>
      <div className="px-7 py-8 border-gray-300 border rounded-3xl flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="text-xl">{title}</p>
          <p className="text-gray-500">{description}</p>
        </div>
        <ChevronRight />
      </div>
    </Link>
  )
}
