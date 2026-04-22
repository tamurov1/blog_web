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
      className="min-h-screen bg-white text-black font-sans relative isolate overflow-x-clip"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundFX containerRef={mainRef} />
      </div>
      <SiteHeader bordered />

      <div className="relative z-10 pt-6">
        {children || <CyberNewsFeed />}
      </div>
    </main>
  )
}
