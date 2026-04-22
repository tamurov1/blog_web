'use client'

import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import BackgroundFX from '@/components/BackgroundFX'
import CyberNewsFeed from '@/components/CyberNewsFeed'

export default function CyberNewsShell({ children }: { children?: ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden"
    >
      <BackgroundFX containerRef={mainRef} />
      <header className="relative z-10 flex flex-col gap-4 border-b border-gray-200 bg-white/70 px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
          <Link href="/" className="tmk-nav-link">Home</Link>
          <Link href="/map" className="tmk-nav-link">Map</Link>
          <Link href="/cybernews" className="tmk-nav-link tmk-nav-link-featured text-blue-600">Cybernews</Link>
          <Link href="/about" className="tmk-nav-link">About</Link>
          <Link href="/shop" className="tmk-nav-link">Shop</Link>
          <Link href="/search" aria-label="Search" className="text-xl hover:opacity-70">
            <FiSearch />
          </Link>
        </nav>
      </header>

      <div className="relative z-10 pt-6">
        {children || <CyberNewsFeed />}
      </div>
    </main>
  )
}
