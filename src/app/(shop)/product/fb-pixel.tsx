'use client'

import { useEffect } from 'react'

export default function FBPixelViewContent({ id, name }: { id: number; name: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'fbq' in window && typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_ids: [id],
        content_name: name,
        content_type: 'product_group',
      })
    }
  }, [])

  return null
}
