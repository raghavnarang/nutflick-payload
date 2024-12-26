import { Product } from '@/payload-types'

interface HeroProps {
  titleLeft: string
  titleRight: string
  tag: string
  product: Product | number
  description: string
}

export default function HeroBlockComponent({
  titleLeft,
  titleRight,
  description,
  tag,
  product,
}: HeroProps) {
  return null
}
