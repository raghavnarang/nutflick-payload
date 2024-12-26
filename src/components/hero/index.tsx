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
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-100 to-orange-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="mb-4">
              <Badge>{tag}</Badge>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-orange-800 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">{titleLeft}</span>{' '}
              <span className="block text-orange-600 xl:inline">{titleRight}</span>
            </h1>
            <p className="mt-3 text-base text-orange-700 md:!leading-9 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              {description}
            </p>
            <Link
              href={`/products/${product.slug}`}
              className="mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <Button large className="shadow">
                Check out now
              </Button>
            </Link>
          </div>

          {/* Product Image */}
          {typeof product.image !== 'number' && product.image.url && (
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-72 md:h-96 lg:h-full">
              <Image
                src={product.image.url}
                alt={product.image.alt || product.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
