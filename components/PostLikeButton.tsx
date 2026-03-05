'use client'

import { useEffect, useMemo, useState } from 'react'

type PostLikeButtonProps = {
  postId: string
  initialCount?: number
}

export default function PostLikeButton({ postId, initialCount = 0 }: PostLikeButtonProps) {
  const likedKey = useMemo(() => `tmk:liked:${postId}`, [postId])
  const countKey = useMemo(() => `tmk:likes:${postId}`, [postId])

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initialCount)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const storedLiked = localStorage.getItem(likedKey) === '1'
      const rawCount = localStorage.getItem(countKey)
      const storedCount = rawCount ? Number.parseInt(rawCount, 10) : initialCount

      setLiked(storedLiked)
      setCount(Number.isFinite(storedCount) ? storedCount : initialCount)
    } catch {
      setLiked(false)
      setCount(initialCount)
    } finally {
      setReady(true)
    }
  }, [countKey, likedKey, initialCount])

  const toggleLike = () => {
    if (!ready) return

    const nextLiked = !liked
    const nextCount = nextLiked ? count + 1 : Math.max(initialCount, count - 1)

    setLiked(nextLiked)
    setCount(nextCount)

    try {
      localStorage.setItem(likedKey, nextLiked ? '1' : '0')
      localStorage.setItem(countKey, String(nextCount))
    } catch {
      // Ignore storage errors (private mode/quota) and keep in-memory state.
    }
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
    >
      <span aria-hidden>{liked ? '♥' : '♡'}</span>
      <span>{count}</span>
      <span>{count === 1 ? 'Like' : 'Likes'}</span>
    </button>
  )
}
