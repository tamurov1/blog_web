'use client'

import { useEffect, useState, type RefObject } from 'react'

type BackgroundFXProps = {
  containerRef: RefObject<HTMLElement | null>
}

export default function BackgroundFX({ containerRef }: BackgroundFXProps) {
  const [waveTick, setWaveTick] = useState(0)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const setVars = (x: number, y: number) => {
      const rect = root.getBoundingClientRect()
      const clampX = Math.max(0, Math.min(x - rect.left, rect.width))
      const clampY = Math.max(0, Math.min(y - rect.top, rect.height))
      const pctX = rect.width ? clampX / rect.width : 0.5
      const pctY = rect.height ? clampY / rect.height : 0.5
      root.style.setProperty('--grid-x', `${clampX}px`)
      root.style.setProperty('--grid-y', `${clampY}px`)
      root.style.setProperty('--grid-hue', `${Math.round(pctX * 60 - 10)}deg`)
      root.style.setProperty('--grid-shift-x', `${(pctX - 0.5) * 20}px`)
      root.style.setProperty('--grid-shift-y', `${(pctY - 0.5) * 20}px`)
    }

    const handleMove = (event: MouseEvent) => {
      setVars(event.clientX, event.clientY)
    }

    const handleLeave = () => {
      const rect = root.getBoundingClientRect()
      setVars(rect.left + rect.width / 2, rect.top + rect.height / 2)
    }

    const handleClick = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect()
      setVars(event.clientX, event.clientY)
      root.style.setProperty('--wave-x', `${event.clientX - rect.left}px`)
      root.style.setProperty('--wave-y', `${event.clientY - rect.top}px`)
      setWaveTick((prev) => prev + 1)
    }

    handleLeave()
    window.addEventListener('mousemove', handleMove)
    root.addEventListener('mouseleave', handleLeave)
    root.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      root.removeEventListener('mouseleave', handleLeave)
      root.removeEventListener('click', handleClick)
    }
  }, [containerRef])

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="hero-grid absolute inset-0 opacity-45" data-wave={waveTick} />
      <div className="absolute -top-28 left-6 h-56 w-56 rounded-full bg-sky-200 blur-3xl opacity-55 animate-float-slow" />
      <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-50 animate-float" />
      <div className="absolute bottom-[-7rem] left-[10%] h-80 w-80 rounded-full bg-emerald-200 blur-3xl opacity-45 animate-float-slower" />
      <div className="absolute top-40 left-[38%] h-16 w-24 rounded-full bg-white/60 shadow-md ring-1 ring-black/5 backdrop-blur-sm animate-float" />
      <div className="absolute bottom-28 right-[18%] h-20 w-20 rounded-2xl bg-white/60 shadow-lg ring-1 ring-black/5 backdrop-blur-sm animate-float-slow" />
    </div>
  )
}
