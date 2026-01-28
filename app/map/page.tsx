'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import BlogMap from '@/components/BlogMap'
import BackgroundFX from '@/components/BackgroundFX'

export default function MapPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-0 font-sans flex flex-col relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 relative z-10 animate-fade-up">
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
        <nav className="flex gap-4 items-center text-sm font-medium">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" />
        </nav>
      </div>

      {/* Fullscreen Blog Map */}
      <div className="w-full h-[calc(100vh-64px)] overflow-hidden relative z-10 animate-fade-up-1">
        <div className="h-full bg-white/70 backdrop-blur">
          <BlogMap />
        </div>
      </div>
    </main>
  )
}
