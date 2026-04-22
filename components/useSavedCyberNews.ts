'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tmk:saved-cybernews-posts'

function readSavedPostIds() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

function writeSavedPostIds(postIds: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(postIds))
  window.dispatchEvent(new CustomEvent('tmk:saved-cybernews-change'))
}

export function useSavedCyberNews() {
  const [savedPostIds, setSavedPostIds] = useState<string[]>([])

  useEffect(() => {
    const sync = () => setSavedPostIds(readSavedPostIds())

    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('tmk:saved-cybernews-change', sync)

    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('tmk:saved-cybernews-change', sync)
    }
  }, [])

  const savePost = (postId: string) => {
    const current = readSavedPostIds()
    if (current.includes(postId)) return
    writeSavedPostIds([postId, ...current])
  }

  const removePost = (postId: string) => {
    writeSavedPostIds(readSavedPostIds().filter((savedPostId) => savedPostId !== postId))
  }

  const togglePost = (postId: string) => {
    const current = readSavedPostIds()
    if (current.includes(postId)) {
      writeSavedPostIds(current.filter((savedPostId) => savedPostId !== postId))
      return
    }

    writeSavedPostIds([postId, ...current])
  }

  return {
    savedPostIds,
    savePost,
    removePost,
    togglePost,
    isSaved: (postId: string) => savedPostIds.includes(postId),
  }
}
