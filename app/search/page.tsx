'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
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
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight select-none cursor-default">
          <Image
            src="/logo-black.png"
            alt="TMK logo"
            width={26}
            height={26}
            className="h-6 w-6 object-contain"
            priority
          />
          TMK
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 items-center">
          <Link href="/" className="tmk-nav-link">Home</Link>
          <Link href="/map" className="tmk-nav-link">Map</Link>
          <Link href="/cybernews" className="tmk-nav-link tmk-nav-link-featured">Cybernews</Link>
          <Link href="/about" className="tmk-nav-link">About</Link>
          <Link href="/shop" className="tmk-nav-link">Shop</Link>
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
