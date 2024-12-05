import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getProductDataFromParams, type ProductProps } from './helper'

// Image metadata
export const alt = 'Buy Premium Quality Dry Fruits on Nutflick.com'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image(props: ProductProps) {
  const logoData = await readFile(
    join(
      process.cwd(),
      process.env.NODE_ENV === 'production' ? './public/logo.png' : './src/public/logo.png',
    ),
  )
  const logoSrc = Uint8Array.from(logoData).buffer

  const data = await getProductDataFromParams(props)
  if (!data) {
    return null
  }

  const { product } = data

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '50px',
        }}
      >
        {typeof product.image !== 'number' &&
          product.image.url &&
          !product.image.url.includes('.webp') && (
            <img
              style={{ borderRadius: '20px' }}
              src={process.env.NEXT_PUBLIC_VERCEL_URL! + product.image.url}
              width={400}
            />
          )}
        <span style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <img src={logoSrc as unknown as string} width={300} />
          <span
            style={{
              fontSize: 60,
              maxWidth: '600px',
            }}
          >
            {product.title}
          </span>
          <span
            style={{
              fontSize: 30,
              lineHeight: 1.5,
              maxWidth: '500px',
            }}
          >
            Buy Premium Quality Dry Fruits on Nutflick.com
          </span>
        </span>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  )
}
