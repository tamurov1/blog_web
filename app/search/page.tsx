'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import BackgroundFX from '@/components/BackgroundFX'

export default function SearchPage() {
  const [showInput, setShowInput] = useState(true)
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />

      {/* Header */}
      <div className="flex justify-between items-center mb-12 relative z-10 animate-fade-up">
        <div className="text-2xl font-bold tracking-tight select-none cursor-default">TMK</div>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" />
        </nav>
      </div>

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
