'use client'

import { useEffect, useMemo, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

type PostLikeButtonProps = {
  postId: string
  initialCount?: number
}

export default function PostLikeButton({ postId, initialCount = 0 }: PostLikeButtonProps) {
  const deviceKey = 'tmk:device-id'
  const likedKey = useMemo(() => `tmk:liked:${postId}`, [postId])
  const countKey = useMemo(() => `tmk:last-count:${postId}`, [postId])

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initialCount)
  const [deviceId, setDeviceId] = useState('')
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const createDeviceId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
      }
      return `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }

    try {
      let localDeviceId = localStorage.getItem(deviceKey) || ''
      if (!localDeviceId) {
        localDeviceId = createDeviceId()
        localStorage.setItem(deviceKey, localDeviceId)
      }

      const storedLiked = localStorage.getItem(likedKey) === '1'
      const rawCount = localStorage.getItem(countKey)
      const storedCount = rawCount ? Number.parseInt(rawCount, 10) : initialCount

      setDeviceId(localDeviceId)
      setLiked(storedLiked)
      setCount(Number.isFinite(storedCount) ? storedCount : initialCount)
    } catch {
      setLiked(false)
      setCount(initialCount)
    } finally {
      setReady(true)
    }
  }, [countKey, likedKey, initialCount])

  useEffect(() => {
    if (!ready || !deviceId) return

    let mounted = true

    const syncFromServer = async () => {
      try {
        const res = await fetch(`/api/likes/${encodeURIComponent(postId)}?deviceId=${encodeURIComponent(deviceId)}`, {
          cache: 'no-store',
        })

        if (!res.ok) return

        const data = await res.json()
        if (!mounted) return

        const nextLiked = Boolean(data?.liked)
        const nextCount = Number.isFinite(Number(data?.count)) ? Number(data.count) : count

        setLiked(nextLiked)
        setCount(nextCount)

        localStorage.setItem(likedKey, nextLiked ? '1' : '0')
        localStorage.setItem(countKey, String(nextCount))
      } catch {
        // Keep local state if server is unavailable.
      }
    }

    syncFromServer()

    return () => {
      mounted = false
    }
  }, [ready, deviceId, postId, likedKey, countKey, count])

  const toggleLike = async () => {
    if (!ready || !deviceId || busy) return

    setBusy(true)
    const nextLiked = !liked

    try {
      const res = await fetch(`/api/likes/${encodeURIComponent(postId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId,
          like: nextLiked,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const nextCount = Number.isFinite(Number(data?.count)) ? Number(data.count) : count

        setLiked(Boolean(data?.liked))
        setCount(nextCount)

        localStorage.setItem(likedKey, data?.liked ? '1' : '0')
        localStorage.setItem(countKey, String(nextCount))
      } else {
        const fallbackCount = nextLiked ? count + 1 : Math.max(initialCount, count - 1)
        setLiked(nextLiked)
        setCount(fallbackCount)
        localStorage.setItem(likedKey, nextLiked ? '1' : '0')
        localStorage.setItem(countKey, String(fallbackCount))
      }
    } catch {
      const fallbackCount = nextLiked ? count + 1 : Math.max(initialCount, count - 1)
      setLiked(nextLiked)
      setCount(fallbackCount)
      localStorage.setItem(likedKey, nextLiked ? '1' : '0')
      localStorage.setItem(countKey, String(fallbackCount))
    }

    setBusy(false)
  }

  return (
    <button
      type="button"
      onClick={toggleLike}
      className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${
        liked
          ? 'border-rose-300 bg-rose-50 text-rose-700'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      }`}
      aria-pressed={liked}
      disabled={busy}
    >
      <span aria-hidden>{liked ? <FaHeart /> : <FaRegHeart />}</span>
      <span>{count}</span>
      <span>{count === 1 ? 'Like' : 'Likes'}</span>
    </button>
  )
}
