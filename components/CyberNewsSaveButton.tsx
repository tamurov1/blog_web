'use client'

import { FiBookmark } from 'react-icons/fi'
import { useSavedCyberNews } from '@/components/useSavedCyberNews'

export default function CyberNewsSaveButton({
  postId,
  className = '',
  compact = false,
}: {
  postId: string
  className?: string
  compact?: boolean
}) {
  const { isSaved, togglePost } = useSavedCyberNews()
  const saved = isSaved(postId)

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        togglePost(postId)
      }}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-xs font-medium transition ${
        saved
          ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
          : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
      } ${className}`}
      aria-pressed={saved}
      aria-label={saved ? 'Remove saved post' : 'Save post'}
    >
      <FiBookmark aria-hidden="true" />
      {compact ? (saved ? 'Saved' : 'Save') : saved ? 'Saved post' : 'Save post'}
    </button>
  )
}
