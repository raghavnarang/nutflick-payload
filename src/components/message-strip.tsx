import Link from 'next/link'
import WhatsApp from './Icons/whatsapp'
import Container from './container'

export default function MessageStrip({ message }: { message: string }) {
  return (
    <div className="bg-primary">
      <Container>
        <div className="flex items-center justify-between text-white text-center h-8 md:text-sm text-xs font-medium">
          <span>{message}</span>
          <Link
            target="_blank"
            href={`https://wa.me/message/M2VDJTKHT75RA1`}
            className="flex items-center gap-1 border-orange-950"
          >
            <WhatsApp className="text-white !size-5" /> +91-7340803995
          </Link>
        </div>
      </Container>
    </div>
  )
}
