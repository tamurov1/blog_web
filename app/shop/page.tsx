'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import BackgroundFX from '@/components/BackgroundFX'
import ShopIntro from '@/components/ShopIntro'
import ProductTiles from '@/components/ProductTiles'

export default function ShopPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-[#FAFAFA] text-[#111] p-6 sm:p-12 font-sans relative overflow-hidden"
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
        <nav className="flex gap-4 items-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" />
        </nav>
      </div>

      <div className="relative z-10 space-y-10">
        <ShopIntro />
        <ProductTiles />
      </div>
    </main>
  )
}
