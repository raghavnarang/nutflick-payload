import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Image metadata
export const alt = 'Buy Premium Quality Dry Fruits on Nutflick.com'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  const logoData = await readFile(join(process.cwd(), './src/public/logo.png'))
  const logoSrc = Uint8Array.from(logoData).buffer
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
          gap: '50px'
        }}
      >
        <img src={logoSrc as unknown as string} width={1000} />
        <span
          style={{
            fontSize: 50,
            lineHeight: 1.5,
            maxWidth: '900px',
            textAlign: 'center',
          }}
        >
          Buy Premium Quality Dry Fruits on Nutflick.com
        </span>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  )
}
