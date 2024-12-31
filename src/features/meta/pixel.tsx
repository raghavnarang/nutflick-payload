'use client'

import { useEffect, useRef } from 'react'

export default function TriggerMetaPixel({ event, data }: { event: string; data: any }) {
  const alreadyFired = useRef(false)
  useEffect(() => {
    setTimeout(() => {
      if (
        typeof window !== 'undefined' &&
        'fbq' in window &&
        typeof window.fbq === 'function' &&
        !alreadyFired.current
      ) {
        alreadyFired.current = true
        window.fbq('track', event, data)
      }
    }, 100)
  }, [])

  return null
}
