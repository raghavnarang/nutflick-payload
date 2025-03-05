import Image from 'next/image'
import BlockSection from './block-section'
import type { BrandFeatures } from '@/payload-types'

export default function Features({ features, title, subtitle }: BrandFeatures) {
  if (!features) {
    return null
  }

  return (
    <BlockSection title={title || ''} subtitle={subtitle || ''}>
      <div className="flex flex-wrap justify-center">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="lg:w-1/4 md:w-1/3 w-1/2 flex flex-col items-center gap-5 px-3 md:px-0 last:mb-0 md:mb-0 mb-5"
          >
            {typeof feature.image !== 'number' && feature.image?.url && (
              <Image
                src={feature.image.url}
                alt={feature.text || ''}
                width={200}
                height={200}
                className="md:w-56 w-36"
              />
            )}
            <p className="font-bold md:text-lg md:w-60 text-center text-base">{feature.text}</p>
          </div>
        ))}
      </div>
    </BlockSection>
  )
}
