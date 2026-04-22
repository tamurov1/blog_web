'use client'
import { useRef } from 'react'
import BackgroundFX from '@/components/BackgroundFX'
import ShopIntro from '@/components/ShopIntro'
import ProductTiles from '@/components/ProductTiles'
import SiteHeader from '@/components/SiteHeader'

export default function ShopPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-[#FAFAFA] text-[#111] p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />
      <SiteHeader className="-mx-6 -mt-6 mb-12 animate-fade-up sm:-mx-12 sm:-mt-12" />

      <div className="relative z-10 space-y-10">
        <ShopIntro />
        <ProductTiles />
      </div>
    </main>
  )
}
