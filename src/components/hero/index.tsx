import Image from 'next/image'
import Badge from './badge'
import Button from '../button'
import type { Product } from '@/payload-types'
import Link from 'next/link'

interface HeroProps {
  titleLeft: string
  titleRight: string
  tag: string
  product: Product
  description: string
}

export default async function HeroBanner({
  titleLeft,
  titleRight,
  description,
  tag,
  product,
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-100 to-orange-300 px-3 xl:px-0">
      <div className="container xl:max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
          {/* Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start pt-12 lg:py-24">
            <div className="mb-4">
              <Badge>{tag}</Badge>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-orange-800 sm:text-5xl md:text-6xl !leading-tight">
              <span className="block xl:inline">{titleLeft}</span>{' '}
              <span className="block text-orange-600 xl:inline">{titleRight}</span>
            </h1>
            <p className="mt-3 text-base text-orange-700 md:!leading-relaxed sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              {description}
            </p>
            <Link href={`/product/${product.slug}`} className="mt-8 w-full max-w-80">
              <Button large className="shadow">
                Order Now!
              </Button>
            </Link>
          </div>

          {/* Product Image */}
          {typeof product.image !== 'number' && product.image.url && (
            <div className="h-64 overflow-hidden rounded-lg sm:h-72 md:h-96 lg:h-full lg:p-9 mb-9 lg:mb-0">
              <div className='relative h-full'>
                <Image
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  layout="fill"
                  objectFit="contain"
                  sizes='80vw'
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
