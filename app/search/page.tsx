'use client'
import { useState } from 'react'

export default function SearchPage() {
  const [showInput, setShowInput] = useState(true)

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      {showInput ? (
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 w-80 max-w-full"
          onBlur={() => setShowInput(false)}
        />
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="text-blue-600 hover:underline"
        >
          Click to search again
        </button>
      )}
    </main>
  )
}
