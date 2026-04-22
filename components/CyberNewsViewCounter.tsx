'use client'

import { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'

export default function CyberNewsViewCounter({ postId }: { postId: string }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const sessionKey = `tmk:viewed:${postId}`

    async function syncViews() {
      try {
        const shouldCount = !window.sessionStorage.getItem(sessionKey)
        const response = await fetch(`/api/views/${postId}`, {
          method: shouldCount ? 'POST' : 'GET',
          cache: 'no-store',
        })

        if (!response.ok) return

        const data = await response.json()
        const nextCount = Number(data?.count)
        if (!cancelled && Number.isFinite(nextCount)) {
          setCount(nextCount)
        }

        if (shouldCount) {
          window.sessionStorage.setItem(sessionKey, '1')
        }
      } catch {
        // Hide the counter if the backing store is unavailable.
      }
    }

    syncViews()

    return () => {
      cancelled = true
    }
  }, [postId])

  if (count === null) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
      <FiEye aria-hidden="true" />
      {count.toLocaleString()} views
    </span>
  )
}
