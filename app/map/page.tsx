'use client'
import { useRef } from 'react'
import BlogMap from '@/components/BlogMap'
import BackgroundFX from '@/components/BackgroundFX'
import SiteHeader from '@/components/SiteHeader'

export default function MapPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-0 font-sans flex flex-col relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />
      <SiteHeader bordered className="animate-fade-up" />

      {/* Fullscreen Blog Map */}
      <div className="w-full h-[calc(100vh-64px)] overflow-hidden relative z-10 animate-fade-up-1">
        <div className="h-full bg-white/70 backdrop-blur">
          <BlogMap />
        </div>
      </div>
    </main>
  )
}
