'use client'

import { useRef, type ReactNode } from 'react'
import BackgroundFX from '@/components/BackgroundFX'
import CyberNewsFeed from '@/components/CyberNewsFeed'
import SiteHeader from '@/components/SiteHeader'

export default function CyberNewsShell({ children }: { children?: ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden"
    >
      <BackgroundFX containerRef={mainRef} />
      <SiteHeader bordered />

      <div className="relative z-10 pt-6">
        {children || <CyberNewsFeed />}
      </div>
    </main>
  )
}
