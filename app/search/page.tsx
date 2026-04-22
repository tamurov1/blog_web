'use client'
import { useRef, useState } from 'react'
import BackgroundFX from '@/components/BackgroundFX'
import SiteHeader from '@/components/SiteHeader'

export default function SearchPage() {
  const [showInput, setShowInput] = useState(true)
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />

      <SiteHeader className="-mx-6 -mt-6 mb-12 animate-fade-up sm:-mx-12 sm:-mt-12" />

      <div className="relative z-10 animate-fade-up-1">
        <h1 className="text-2xl font-bold mb-4">Search</h1>

        {showInput ? (
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 w-80 max-w-full bg-white/70 backdrop-blur shadow-sm"
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
      </div>
    </main>
  )
}
