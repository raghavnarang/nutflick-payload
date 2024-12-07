'use client'

import regenerateMediaImages from '@/features/server/actions/regenrate-images'
import { useTransition } from 'react'

export default function RegenrateImages() {
  const [pending, startTransition] = useTransition()
  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <button
        style={{
          background: 'transparent',
          border: '1px solid #fff',
          padding: '10px 20px',
          cursor: 'pointer',
          color: '#fff'
        }}
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const result = await regenerateMediaImages()
            alert(result.message)
          })
        }}
      >
        {pending ? 'Generating Images, Please wait...' : 'Regenerate Images'}
      </button>
    </div>
  )
}
