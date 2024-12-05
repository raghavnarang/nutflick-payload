import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getPageData, type PageProps } from './helper'

// Image metadata
export const alt = 'Buy Premium Quality Dry Fruits on Nutflick.com'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image(props: PageProps) {
  const logoData = await readFile(
    join(
      process.cwd(),
      process.env.NODE_ENV === 'production' ? './public/logo.png' : './src/public/logo.png',
    ),
  )
  const logoSrc = Uint8Array.from(logoData).buffer

  const pageData = await getPageData(props)
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 40,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '50px',
        }}
      >
        <img src={logoSrc as unknown as string} width={500} />
        {pageData?.title && (
          <span
            style={{
              fontSize: 80,
              lineHeight: 1.2,
              maxWidth: '900px',
              textAlign: 'center',
            }}
          >
            {pageData?.title}
          </span>
        )}
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  )
}
