'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { FiActivity, FiArrowRight, FiDatabase, FiFileText, FiTerminal } from 'react-icons/fi'

const focusTiles = [
  {
    title: 'Detect suspicious traffic',
    label: 'Snort NIDS lab',
    href: '/projects/snort-ssh-detection-lab',
    Icon: FiActivity,
    visual: 'radial',
    image: '/icons/project_1.png',
  },
  {
    title: 'Automate log triage',
    label: 'Bash threat detection',
    href: '/projects/automated-threat-detection-bash',
    Icon: FiDatabase,
    visual: 'database',
    image: '/icons/project_2.svg',
  },
  {
    title: 'Document incidents',
    label: 'SOC-style reports',
    href: '/projects/snort-ssh-detection-lab',
    Icon: FiFileText,
    visual: 'flow',
  },
  {
    title: 'Build secure tools',
    label: 'Development portfolio',
    href: '/projects/nexessary',
    Icon: FiTerminal,
    visual: 'terminal',
    image: '/icons/project_3.svg',
  },
]

const scrollingFocusTiles = [...focusTiles, ...focusTiles]

export default function HeroTileScroller() {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const touchYRef = useRef<number | null>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current

    if (!viewport || !track) {
      return
    }

    const normalizeOffset = () => {
      const loopHeight = track.scrollHeight / 2
      if (loopHeight <= 0) {
        return
      }

      offsetRef.current = ((offsetRef.current % loopHeight) + loopHeight) % loopHeight
      track.style.transform = `translateY(${-offsetRef.current}px)`
    }

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time
      }

      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!pausedRef.current) {
        offsetRef.current += delta * 0.025
        normalizeOffset()
      }

      frameRef.current = window.requestAnimationFrame(tick)
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      offsetRef.current += event.deltaY
      normalizeOffset()
    }

    const onTouchStart = (event: TouchEvent) => {
      pausedRef.current = true
      touchYRef.current = event.touches[0]?.clientY ?? null
    }

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY
      if (currentY === undefined || touchYRef.current === null) {
        return
      }

      event.preventDefault()
      offsetRef.current += touchYRef.current - currentY
      touchYRef.current = currentY
      normalizeOffset()
    }

    const onTouchEnd = () => {
      touchYRef.current = null
      pausedRef.current = false
      lastTimeRef.current = null
    }

    viewport.addEventListener('wheel', onWheel, { passive: false })
    viewport.addEventListener('touchstart', onTouchStart, { passive: true })
    viewport.addEventListener('touchmove', onTouchMove, { passive: false })
    viewport.addEventListener('touchend', onTouchEnd)
    viewport.addEventListener('touchcancel', onTouchEnd)
    frameRef.current = window.requestAnimationFrame(tick)
    normalizeOffset()

    return () => {
      viewport.removeEventListener('wheel', onWheel)
      viewport.removeEventListener('touchstart', onTouchStart)
      viewport.removeEventListener('touchmove', onTouchMove)
      viewport.removeEventListener('touchend', onTouchEnd)
      viewport.removeEventListener('touchcancel', onTouchEnd)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={viewportRef}
      className="cyber-tile-scroll-shell relative mx-auto h-[310px] w-full max-w-[520px] overflow-hidden sm:h-[360px] md:h-[400px] md:max-w-none"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
        lastTimeRef.current = null
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-[#f8fafc] to-transparent sm:h-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-[#f8fafc] to-transparent sm:h-20" />
      <div ref={trackRef} className="cyber-tile-scroll py-3 sm:py-4">
        {scrollingFocusTiles.map(({ title, label, href, Icon, visual, image }, index) => (
          <Link
            key={`${title}-${index}`}
            href={href}
            className="group relative mx-auto min-h-[168px] w-[92%] overflow-hidden rounded-md border border-slate-200 bg-white/85 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.10)] backdrop-blur transition hover:border-blue-300 hover:bg-white hover:shadow-[0_22px_52px_rgba(15,23,42,0.14)] sm:min-h-[180px] sm:w-[88%] sm:p-6 md:min-h-[190px] md:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="max-w-[13rem] text-sm font-semibold leading-5 text-slate-950 sm:text-base sm:leading-6">
                  {title}
                </h2>
                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2">{label}</p>
              </div>
              <Icon className="text-xl text-blue-700" aria-hidden="true" />
            </div>

            {image ? (
              <Image
                src={image}
                alt=""
                width={148}
                height={148}
                className="pointer-events-none absolute left-1/2 top-[58%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 object-contain opacity-80 transition group-hover:scale-105 group-hover:opacity-95 sm:h-32 sm:w-32"
                aria-hidden="true"
              />
            ) : (
              <div className={`cyber-tile-visual cyber-tile-visual-${visual}`} aria-hidden="true" />
            )}

            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition group-hover:text-blue-700 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
              See case study <FiArrowRight aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
