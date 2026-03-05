'use client'

import { useEffect, useState, type RefObject } from 'react'

type BackgroundFXProps = {
  containerRef: RefObject<HTMLElement | null>
}

export default function BackgroundFX({ containerRef }: BackgroundFXProps) {
  const [waveTick, setWaveTick] = useState(0)
  const [shapes, setShapes] = useState<
    Array<{
      id: string
      kind: 'line' | 'ring' | 'orb'
      top: number
      left: number
      size: number
      rotate: number
      opacity: number
      blur: number
    }>
  >([])

  useEffect(() => {
    const count = Math.floor(10 + Math.random() * 6)
    const next = Array.from({ length: count }).map((_, index) => {
      const kindRoll = Math.random()
      const kind: 'line' | 'ring' | 'orb' =
        kindRoll < 0.5 ? 'line' : kindRoll < 0.75 ? 'ring' : 'orb'
      return {
        id: `${Date.now()}-${index}`,
        kind,
        top: Math.random() * 88,
        left: Math.random() * 88,
        size: 80 + Math.random() * 220,
        rotate: Math.random() * 180,
        opacity: 0.15 + Math.random() * 0.35,
        blur: Math.random() * 8,
      }
    })
    setShapes(next)
  }, [])

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
      root.style.setProperty('--grid-tilt-x', `${(pctX - 0.5) * 8}deg`)
      root.style.setProperty('--grid-tilt-y', `${(0.5 - pctY) * 6}deg`)
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
    <div className="pointer-events-none absolute -inset-[15%]">
      <div className="hero-grid absolute inset-0 opacity-45" data-wave={waveTick} />
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`abstract-${shape.kind}`}
          style={{
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            width: `${shape.size}px`,
            height: `${shape.kind === 'line' ? Math.max(10, shape.size * 0.2) : shape.size}px`,
            opacity: shape.opacity,
            transform: `rotate(${shape.rotate}deg)`,
            filter: `blur(${shape.blur}px)`,
          }}
        />
      ))}
    </div>
  )
}
