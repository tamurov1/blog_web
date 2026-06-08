'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiChevronDown,
  FiExternalLink,
  FiLinkedin,
  FiLock,
  FiMail,
  FiPlay,
  FiSquare,
  FiYoutube,
} from 'react-icons/fi'
import { coreSkills, portfolioProjects } from '@/data/portfolio'

const CANVAS_SIZE = 125000
const CANVAS_CENTER = CANVAS_SIZE / 2
const EDGE_WARN_DISTANCE = 520
const KEYBOARD_PAN_STEP = 90
const AMBIENCE_DISTANCE = 400
const AMBIENCE_SRC = '/music/ambient.mp3'
const SODA_HINT_OFFSET_X = 100
const SODA_OPEN_DISTANCE = 600
const SODA_REACHED_DISTANCE = 220
const EYE_HINT_OFFSET_X = 512
const EYE_PUPIL_CONTAINER_WIDTH = 240
const EYE_PUPIL_CONTAINER_HEIGHT = 100
const EYE_PUPIL_CONTAINER_OFFSET_X = 0
const EYE_PUPIL_CONTAINER_OFFSET_Y = -10
const EYE_PUPIL_SIZE = 96

type Point = {
  x: number
  y: number
}

type ViewportSize = {
  width: number
  height: number
}

const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274',
    icon: FiLinkedin,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA',
    icon: FiYoutube,
  },
  {
    label: 'Nexessary',
    href: 'https://nexessary.com',
    icon: FiExternalLink,
  },
  {
    label: 'Email',
    href: 'mailto:tamurovdm@gmail.com',
    icon: FiMail,
  },
]

const roadmapSteps = [
  'SOC Analyst Tier 1',
  'SOC Analyst Tier 2',
  'Incident Responder',
  'Security Architect',
  'Threat Hunter',
]

const canvasImage = {
  src: '/can_of_soda.png',
  alt: 'Can of soda',
  x: CANVAS_CENTER,
  y: CANVAS_CENTER + 1000,
}

const asciiEye = {
  x: canvasImage.x + 700,
  y: canvasImage.y,
}

const certifications = [
  'Certification details updating',
  'Project-based SOC evidence available below',
]

const usefulLinks = [
  { label: 'Projects index', href: '/projects' },
  { label: 'Cyber news', href: '/cybernews' },
  { label: 'Portfolio map', href: '/map' },
]

function clampPosition(position: Point, viewport: ViewportSize): Point {
  const minX = Math.min(viewport.width - CANVAS_SIZE, 0)
  const minY = Math.min(viewport.height - CANVAS_SIZE, 0)

  return {
    x: Math.min(0, Math.max(minX, position.x)),
    y: Math.min(0, Math.max(minY, position.y)),
  }
}

function getCenteredPosition(viewport: ViewportSize): Point {
  return clampPosition(
    {
      x: viewport.width / 2 - CANVAS_CENTER,
      y: viewport.height / 2 - CANVAS_CENTER,
    },
    viewport,
  )
}

function isOutsideMainSpaceForPosition(position: Point, viewport: ViewportSize) {
  if (viewport.width === 0 || viewport.height === 0) {
    return false
  }

  const visibleCenter = {
    x: -position.x + viewport.width / 2,
    y: -position.y + viewport.height / 2,
  }

  return (
    Math.abs(visibleCenter.x - CANVAS_CENTER) >= AMBIENCE_DISTANCE ||
    Math.abs(visibleCenter.y - CANVAS_CENTER) >= AMBIENCE_DISTANCE
  )
}

export default function ConstructionCanvas() {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const eyeRef = useRef<HTMLDivElement | null>(null)
  const irisPupilRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef<Point>({ x: 0, y: 0 })
  const viewportSizeRef = useRef<ViewportSize>({ width: 0, height: 0 })
  const pointerRef = useRef<Point | null>(null)
  const eyeRectRef = useRef<DOMRect | null>(null)
  const pupilTargetRef = useRef<Point>({ x: 0, y: 0 })
  const pupilCurrentRef = useRef<Point>({ x: 0, y: 0 })
  const reducedMotionRef = useRef(false)
  const initializedRef = useRef(false)
  const audioManuallyStoppedRef = useRef(false)
  const sodaHintShownRef = useRef(false)
  const sodaHintWasInViewRef = useRef(false)
  const sodaHintTimeoutRef = useRef<number | null>(null)
  const eyeHintShownRef = useRef(false)
  const eyeHintWasInViewRef = useRef(false)
  const eyeHintTimeoutRef = useRef<number | null>(null)
  const sodaFadeTimeoutRef = useRef<number | null>(null)
  const sodaGoneTimeoutRef = useRef<number | null>(null)
  const successMessageTimeoutRef = useRef<number | null>(null)
  const sodaReachedRef = useRef(false)
  const dragRef = useRef({
    active: false,
    pointerId: 0,
    startClientX: 0,
    startClientY: 0,
    startX: 0,
    startY: 0,
  })

  const [position, setPositionState] = useState<Point>({ x: 0, y: 0 })
  const [viewportSize, setViewportSize] = useState<ViewportSize>({ width: 0, height: 0 })
  const [initialized, setInitialized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [audioPanelVisible, setAudioPanelVisible] = useState(false)
  const [audioPanelHiddenByF11, setAudioPanelHiddenByF11] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioBlocked, setAudioBlocked] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [sodaHintVisible, setSodaHintVisible] = useState(false)
  const [eyeHintVisible, setEyeHintVisible] = useState(false)
  const [sodaOpened, setSodaOpened] = useState(false)
  const [sodaFading, setSodaFading] = useState(false)
  const [sodaGone, setSodaGone] = useState(false)
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)

  const playAmbience = useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    setAudioPanelVisible(true)
    setAudioBlocked(false)
    setAudioError(false)

    if (!audio.paused) {
      setAudioPlaying(true)
      return
    }

    audio
      .play()
      .then(() => {
        setAudioPlaying(true)
        setAudioBlocked(false)
      })
      .catch(() => {
        setAudioPlaying(false)
        setAudioBlocked(true)
      })
  }, [])

  const setPosition = useCallback((nextPosition: Point) => {
    const clamped = clampPosition(nextPosition, viewportSizeRef.current)
    positionRef.current = clamped
    setPositionState(clamped)

    if (
      isOutsideMainSpaceForPosition(clamped, viewportSizeRef.current) &&
      !audioManuallyStoppedRef.current
    ) {
      playAmbience()
    }
  }, [playAmbience])

  useEffect(() => {
    const updateViewport = () => {
      const nextSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      const previousSize = viewportSizeRef.current
      const previousPosition = positionRef.current

      viewportSizeRef.current = nextSize
      setViewportSize(nextSize)

      if (!initializedRef.current || previousSize.width === 0 || previousSize.height === 0) {
        const centered = getCenteredPosition(nextSize)
        positionRef.current = centered
        setPositionState(centered)
        initializedRef.current = true
        setInitialized(true)
        return
      }

      const visibleCenter = {
        x: previousSize.width / 2 - previousPosition.x,
        y: previousSize.height / 2 - previousPosition.y,
      }
      const preservedCenter = clampPosition(
        {
          x: nextSize.width / 2 - visibleCenter.x,
          y: nextSize.height / 2 - visibleCenter.y,
        },
        nextSize,
      )

      positionRef.current = preservedCenter
      setPositionState(preservedCenter)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
    }
  }, [])

  useEffect(() => {
    let animationFrameId = 0
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateEyeRect = () => {
      if (!eyeRef.current) {
        eyeRectRef.current = null
        return
      }

      eyeRectRef.current = eyeRef.current.getBoundingClientRect()
    }

    const resetPupilTarget = () => {
      pointerRef.current = null
      pupilTargetRef.current = { x: 0, y: 0 }
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      }
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        resetPupilTarget()
      }
    }

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches
    }

    const animatePupil = () => {
      updateEyeRect()

      const eyeRect = eyeRectRef.current
      const irisPupil = irisPupilRef.current
      const pointer = pointerRef.current

      if (eyeRect && irisPupil && pointer) {
        const centerX = eyeRect.left + eyeRect.width / 2
        const centerY = eyeRect.top + eyeRect.height / 2
        const dx = pointer.x - centerX
        const dy = pointer.y - centerY
        const maxX = eyeRect.width * 0.18
        const maxY = eyeRect.height * 0.12

        if (dx === 0 && dy === 0) {
          pupilTargetRef.current = { x: 0, y: 0 }
        } else {
          const ellipseDistance = Math.hypot(dx / maxX, dy / maxY)
          const clampedDistance = Math.max(1, ellipseDistance)

          // Clamp the pupil center to an elliptical travel area inside the eyelid.
          pupilTargetRef.current = {
            x: dx / clampedDistance,
            y: dy / clampedDistance,
          }
        }
      }

      const easing = reducedMotionRef.current ? 1 : 0.12
      const current = pupilCurrentRef.current
      const target = pupilTargetRef.current
      const next = {
        x: current.x + (target.x - current.x) * easing,
        y: current.y + (target.y - current.y) * easing,
      }

      pupilCurrentRef.current = next

      if (irisPupilRef.current) {
        irisPupilRef.current.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`
      }

      animationFrameId = window.requestAnimationFrame(animatePupil)
    }

    reducedMotionRef.current = reducedMotionQuery.matches
    updateEyeRect()
    animationFrameId = window.requestAnimationFrame(animatePupil)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerout', handlePointerOut)
    window.addEventListener('pointercancel', resetPupilTarget)
    window.addEventListener('blur', resetPupilTarget)
    window.addEventListener('resize', updateEyeRect)
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('pointercancel', resetPupilTarget)
      window.removeEventListener('blur', resetPupilTarget)
      window.removeEventListener('resize', updateEyeRect)
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  useEffect(() => {
    const clientStartedAt = Date.now()
    let visitId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${clientStartedAt}-${Math.random().toString(16).slice(2)}`
    let serverStartedAt = new Date(clientStartedAt).toISOString()
    let visitorIp = 'unknown'

    const formatElapsed = () => {
      const totalSeconds = Math.floor((Date.now() - clientStartedAt) / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      return `${minutes}m ${seconds}s`
    }

    const sendVisitEvent = (
      eventName: 'active' | 'hidden' | 'leaving' | 'unmounted',
      transport: 'fetch' | 'beacon' = 'fetch',
    ) => {
      const payload = {
        visitId,
        event: eventName,
        startedAt: serverStartedAt,
        elapsedMs: Date.now() - clientStartedAt,
      }

      console.info('[construction visit]', {
        event: eventName,
        visitId,
        ipAddress: visitorIp,
        timeSpent: formatElapsed(),
      })

      if (transport === 'beacon' && navigator.sendBeacon) {
        const body = new Blob([JSON.stringify(payload)], {
          type: 'application/json',
        })

        navigator.sendBeacon('/api/construction-visit', body)
        return
      }

      fetch('/api/construction-visit', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: transport === 'beacon',
      }).catch((error: unknown) => {
        console.warn('[construction visit] event send failed', error)
      })
    }

    fetch('/api/construction-visit', { cache: 'no-store' })
      .then((response) => response.json())
      .then((visit: { visitId?: string; ipAddress?: string; startedAt?: string }) => {
        visitId = visit.visitId ?? visitId
        visitorIp = visit.ipAddress ?? 'unknown'
        serverStartedAt = visit.startedAt ?? serverStartedAt
        console.info('[construction visit]', {
          event: 'started',
          visitId,
          ipAddress: visitorIp,
          startedAt: serverStartedAt,
          timeSpent: '0m 0s',
        })
      })
      .catch((error: unknown) => {
        console.warn('[construction visit] ip lookup failed', error)
      })

    const intervalId = window.setInterval(() => {
      sendVisitEvent('active')
    }, 15000)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendVisitEvent('hidden', 'beacon')
      }
    }

    const handleBeforeUnload = () => {
      sendVisitEvent('leaving', 'beacon')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      sendVisitEvent('unmounted', 'beacon')
    }
  }, [])

  const stopAmbience = useCallback(() => {
    const audio = audioRef.current

    audioManuallyStoppedRef.current = true

    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }

    setAudioPlaying(false)
    setAudioBlocked(false)
  }, [])

  const handleAudioToggle = () => {
    if (audioPlaying) {
      stopAmbience()
      return
    }

    audioManuallyStoppedRef.current = false
    playAmbience()
  }

  const handleAudioPanelTap = () => {
    if (audioPanelVisible) {
      setAudioPanelHiddenByF11((isHidden) => !isHidden)
    }
  }

  const triggerSodaOpen = useCallback(() => {
    if (sodaOpened || sodaGone) {
      return
    }

    setSodaOpened(true)
    setSuccessMessageVisible(true)

    if (sodaFadeTimeoutRef.current) {
      window.clearTimeout(sodaFadeTimeoutRef.current)
    }

    if (sodaGoneTimeoutRef.current) {
      window.clearTimeout(sodaGoneTimeoutRef.current)
    }

    if (successMessageTimeoutRef.current) {
      window.clearTimeout(successMessageTimeoutRef.current)
    }

    sodaFadeTimeoutRef.current = window.setTimeout(() => {
      setSodaFading(true)
      sodaFadeTimeoutRef.current = null
    }, 60)

    sodaGoneTimeoutRef.current = window.setTimeout(() => {
      setSodaGone(true)
      sodaGoneTimeoutRef.current = null
    }, 2060)

    successMessageTimeoutRef.current = window.setTimeout(() => {
      setSuccessMessageVisible(false)
      successMessageTimeoutRef.current = null
    }, 2000)
  }, [sodaGone, sodaOpened])

  const isOutsideMainSpace = useCallback(() => {
    const viewport = viewportSizeRef.current
    const currentPosition = positionRef.current

    if (viewport.width === 0 || viewport.height === 0) {
      return false
    }

    const visibleCenter = {
      x: -currentPosition.x + viewport.width / 2,
      y: -currentPosition.y + viewport.height / 2,
    }

    return (
      Math.abs(visibleCenter.x - CANVAS_CENTER) >= AMBIENCE_DISTANCE ||
      Math.abs(visibleCenter.y - CANVAS_CENTER) >= AMBIENCE_DISTANCE
    )
  }, [])

  useEffect(() => {
    const unlockAudio = () => {
      if (!audioPlaying && !audioManuallyStoppedRef.current && isOutsideMainSpace()) {
        playAmbience()
      }
    }

    window.addEventListener('pointerdown', unlockAudio)
    window.addEventListener('keydown', unlockAudio)

    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
    }
  }, [audioPlaying, isOutsideMainSpace, playAmbience])

  useEffect(() => {
    const togglePanelWithF11 = (event: KeyboardEvent) => {
      if (event.key !== 'F11' || event.repeat || !isOutsideMainSpace()) {
        return
      }

      setAudioPanelVisible(true)
      setAudioPanelHiddenByF11((isHidden) => !isHidden)
    }

    window.addEventListener('keydown', togglePanelWithF11)

    return () => {
      window.removeEventListener('keydown', togglePanelWithF11)
    }
  }, [isOutsideMainSpace])

  useEffect(() => {
    if (!initialized || viewportSize.width === 0 || viewportSize.height === 0) {
      return
    }

    const visibleCenter = {
      x: -position.x + viewportSize.width / 2,
      y: -position.y + viewportSize.height / 2,
    }
    const outsideMainSpace = (
      Math.abs(visibleCenter.x - CANVAS_CENTER) >= AMBIENCE_DISTANCE ||
      Math.abs(visibleCenter.y - CANVAS_CENTER) >= AMBIENCE_DISTANCE
    )

    if (outsideMainSpace) {
      setAudioPanelVisible(true)

      if (!audioManuallyStoppedRef.current) {
        playAmbience()
      }

      return
    }

    const audio = audioRef.current

    if (audio) {
      audio.pause()
    }

    setAudioPanelVisible(false)
    setAudioPanelHiddenByF11(false)
    audioManuallyStoppedRef.current = false
    setAudioPlaying(false)
    setAudioBlocked(false)
    setAudioError(false)
  }, [initialized, playAmbience, position, viewportSize])

  const panBy = useCallback(
    (deltaX: number, deltaY: number) => {
      setPosition({
        x: positionRef.current.x + deltaX,
        y: positionRef.current.y + deltaY,
      })
    },
    [setPosition],
  )

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: positionRef.current.x,
      startY: positionRef.current.y,
    }
    setIsDragging(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragRef.current.startClientX
    const deltaY = event.clientY - dragRef.current.startClientY

    setPosition({
      x: dragRef.current.startX + deltaX,
      y: dragRef.current.startY + deltaY,
    })
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId === event.pointerId) {
      dragRef.current.active = false
      setIsDragging(false)

      if (isOutsideMainSpace() && !audioManuallyStoppedRef.current) {
        playAmbience()
      }
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    panBy(-event.deltaX, -event.deltaY)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const handlers: Record<string, () => void> = {
      ArrowLeft: () => panBy(KEYBOARD_PAN_STEP, 0),
      ArrowRight: () => panBy(-KEYBOARD_PAN_STEP, 0),
      ArrowUp: () => panBy(0, KEYBOARD_PAN_STEP),
      ArrowDown: () => panBy(0, -KEYBOARD_PAN_STEP),
      Home: () => setPosition(getCenteredPosition(viewportSizeRef.current)),
    }

    const handler = handlers[event.key]

    if (handler) {
      event.preventDefault()
      handler()
    }
  }

  const visibleBounds = {
    left: -position.x,
    top: -position.y,
    right: -position.x + viewportSize.width,
    bottom: -position.y + viewportSize.height,
  }

  const nearEdges = {
    left: initialized && visibleBounds.left <= EDGE_WARN_DISTANCE,
    top: initialized && visibleBounds.top <= EDGE_WARN_DISTANCE,
    right: initialized && visibleBounds.right >= CANVAS_SIZE - EDGE_WARN_DISTANCE,
    bottom: initialized && visibleBounds.bottom >= CANVAS_SIZE - EDGE_WARN_DISTANCE,
  }

  useEffect(() => {
    if (!initialized || viewportSize.width === 0 || viewportSize.height === 0) {
      return
    }

    const hintPosition = {
      x: canvasImage.x - SODA_HINT_OFFSET_X,
      y: canvasImage.y,
    }
    const hintInView =
      hintPosition.x >= visibleBounds.left &&
      hintPosition.x <= visibleBounds.right &&
      hintPosition.y >= visibleBounds.top &&
      hintPosition.y <= visibleBounds.bottom

    if (hintInView && !sodaHintWasInViewRef.current && !sodaHintShownRef.current) {
      sodaHintShownRef.current = true
      setSodaHintVisible(true)

      if (sodaHintTimeoutRef.current) {
        window.clearTimeout(sodaHintTimeoutRef.current)
      }

      sodaHintTimeoutRef.current = window.setTimeout(() => {
        setSodaHintVisible(false)
        sodaHintTimeoutRef.current = null
      }, 3140)
    }

    sodaHintWasInViewRef.current = hintInView
  }, [initialized, visibleBounds.bottom, visibleBounds.left, visibleBounds.right, visibleBounds.top, viewportSize])

  useEffect(() => {
    if (!initialized || viewportSize.width === 0 || viewportSize.height === 0) {
      return
    }

    const hintPosition = {
      x: asciiEye.x + EYE_HINT_OFFSET_X,
      y: asciiEye.y,
    }
    const hintInView =
      hintPosition.x >= visibleBounds.left &&
      hintPosition.x <= visibleBounds.right &&
      hintPosition.y >= visibleBounds.top &&
      hintPosition.y <= visibleBounds.bottom

    if (hintInView && !eyeHintWasInViewRef.current && !eyeHintShownRef.current) {
      eyeHintShownRef.current = true
      setEyeHintVisible(true)

      if (eyeHintTimeoutRef.current) {
        window.clearTimeout(eyeHintTimeoutRef.current)
      }

      eyeHintTimeoutRef.current = window.setTimeout(() => {
        setEyeHintVisible(false)
        eyeHintTimeoutRef.current = null
      }, 12000)
    }

    eyeHintWasInViewRef.current = hintInView
  }, [initialized, visibleBounds.bottom, visibleBounds.left, visibleBounds.right, visibleBounds.top, viewportSize])

  useEffect(() => {
    if (
      !initialized ||
      viewportSize.width === 0 ||
      viewportSize.height === 0 ||
      sodaOpened ||
      sodaGone
    ) {
      return
    }

    const visibleCenter = {
      x: -position.x + viewportSize.width / 2,
      y: -position.y + viewportSize.height / 2,
    }
    const distanceFromSoda = Math.hypot(
      visibleCenter.x - canvasImage.x,
      visibleCenter.y - canvasImage.y,
    )

    if (distanceFromSoda <= SODA_REACHED_DISTANCE) {
      sodaReachedRef.current = true
      return
    }

    if (sodaReachedRef.current && distanceFromSoda >= SODA_OPEN_DISTANCE) {
      triggerSodaOpen()
    }
  }, [initialized, position, sodaGone, sodaOpened, triggerSodaOpen, viewportSize])

  useEffect(() => {
    return () => {
      if (sodaHintTimeoutRef.current) {
        window.clearTimeout(sodaHintTimeoutRef.current)
      }

      if (eyeHintTimeoutRef.current) {
        window.clearTimeout(eyeHintTimeoutRef.current)
      }

      if (sodaFadeTimeoutRef.current) {
        window.clearTimeout(sodaFadeTimeoutRef.current)
      }

      if (sodaGoneTimeoutRef.current) {
        window.clearTimeout(sodaGoneTimeoutRef.current)
      }

      if (successMessageTimeoutRef.current) {
        window.clearTimeout(successMessageTimeoutRef.current)
      }
    }
  }, [])

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-[#d8ffff]">
      <audio
        ref={audioRef}
        src={AMBIENCE_SRC}
        loop
        preload="none"
        onCanPlay={() => setAudioError(false)}
        onError={() => {
          setAudioPanelVisible(isOutsideMainSpace())
          setAudioPlaying(false)
          setAudioError(true)
        }}
        onPause={() => setAudioPlaying(false)}
        onPlaying={() => {
          setAudioPanelVisible(isOutsideMainSpace())
          setAudioPlaying(true)
          setAudioBlocked(false)
          setAudioError(false)
        }}
      />
      <div
        ref={viewportRef}
        role="application"
        aria-label="Movable portfolio canvas"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        className={`relative h-dvh w-dvw select-none overflow-hidden font-mono outline-none transition-colors duration-300 [scrollbar-width:none] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          touchAction: 'none',
          overscrollBehavior: 'none',
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_52%,rgba(0,0,0,0.74)_100%)]"
        />
        <div
          className={`pointer-events-none fixed left-1/2 top-1/2 z-[80] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-[#d8ffff]/28 bg-black/90 px-5 py-3 font-mono text-sm font-bold uppercase text-white shadow-[0_0_30px_rgba(216,255,255,0.16)] transition duration-500 sm:text-base ${
            successMessageVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Good Job, explore!
        </div>
        <div
          onClick={handleAudioPanelTap}
          onPointerDown={(event) => event.stopPropagation()}
          className={`fixed right-4 top-4 z-[70] w-[min(88vw,300px)] border border-[#d8ffff]/24 bg-black/88 p-3 font-mono text-[11px] font-bold uppercase text-[#d8ffff] shadow-[0_0_26px_rgba(216,255,255,0.12)] backdrop-blur transition duration-700 ease-out sm:text-xs ${
            audioPanelVisible && !audioPanelHiddenByF11
              ? 'translate-x-0 opacity-100'
              : audioPanelVisible
                ? 'translate-x-[calc(100%-26px)] opacity-100'
                : 'pointer-events-none translate-x-[calc(100%+1rem)] opacity-0'
          }`}
        >
            <div className="flex items-center justify-between gap-3">
              <div
                aria-hidden="true"
                className={`absolute bottom-0 left-0 top-0 w-2 bg-[#d8ffff]/28 transition ${
                  audioPanelVisible && audioPanelHiddenByF11 ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div>
                <p className="text-[#f1ffff]">Ambience</p>
                <p className="mt-1 text-[#d8ffff]/68">
                  {audioError
                    ? 'Audio file unavailable'
                    : audioBlocked
                      ? 'Click play to enable audio'
                      : audioPlaying
                        ? 'Playing'
                        : 'Ready'}
                </p>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  handleAudioToggle()
                }}
                onPointerDown={(event) => event.stopPropagation()}
                className="inline-flex min-h-9 items-center gap-2 border border-[#d8ffff]/28 bg-black px-3 py-2 text-[#d8ffff] transition hover:border-[#e23b48]/70 hover:text-[#e23b48] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ffff]"
              >
                {audioPlaying ? (
                  <>
                    <FiSquare aria-hidden="true" />
                    Stop
                  </>
                ) : (
                  <>
                    <FiPlay aria-hidden="true" />
                    Play
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-[#d8ffff]/68">For better experience, press F11</p>
          </div>

        <div
          className={`absolute left-0 top-0 bg-black transition-opacity duration-500 ${
            initialized ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 border border-red-500/0 shadow-[inset_0_0_0_rgba(239,68,68,0)] transition duration-500 ${
              nearEdges.left || nearEdges.top || nearEdges.right || nearEdges.bottom
                ? 'border-red-500/60 shadow-[inset_0_0_140px_rgba(239,68,68,0.22)]'
                : ''
            }`}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-[0.13] mix-blend-screen"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(216,255,255,0.42) 0, rgba(216,255,255,0.42) 1px, transparent 1px, transparent 4px)',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(216,255,255,0.14) 0%, rgba(24,190,190,0.07) 34%, transparent 68%)',
            }}
          />

          <section className="absolute left-1/2 top-1/2 z-50 max-h-[calc(100dvh-24px)] w-[min(92vw,920px)] origin-center -translate-x-1/2 -translate-y-1/2 [@media(max-height:620px)]:scale-[0.78] [@media(min-height:621px)_and_(max-height:720px)]:scale-[0.9]">
            <div className="grid gap-4 text-[12px] leading-[1.25] sm:text-sm">
              <div className="animate-fade-up border border-[#d8ffff]/20 bg-black/90 p-4 shadow-[0_0_28px_rgba(216,255,255,0.09)] transition duration-300 hover:border-[#d8ffff]/42 hover:shadow-[0_0_38px_rgba(216,255,255,0.14)] sm:p-6">
                <div className="grid gap-5 md:grid-cols-[190px_1fr] md:items-start">
                  <div className="mx-auto w-full max-w-[128px] sm:max-w-[170px] md:mx-0">
                    <div className="relative aspect-square border border-[#d8ffff]/28 bg-black p-1 shadow-[0_0_22px_rgba(216,255,255,0.08)] transition duration-300 hover:border-[#e23b48]/70">
                      <Image
                        src="/pic-ava.png"
                        alt="Dmytrii Tamurov"
                        width={360}
                        height={360}
                        priority
                        draggable={false}
                        className="h-full w-full object-cover object-[center_21%] contrast-110 brightness-95"
                      />
                  </div>
                </div>

                  <div>
                    <h1 className="text-center text-3xl font-bold leading-none tracking-normal text-[#f1ffff] sm:text-5xl md:text-left">
                      Dmytrii Tamurov
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-center text-[#d8ffff]/88 md:mx-0 md:text-left">
                      SOC Analyst-focused workbench for detection labs, Linux security automation,
                      vulnerability research, and secure development projects.
                    </p>

                    <div className="mx-auto mt-4 max-w-xl space-y-1 text-center text-[11px] font-bold uppercase text-[#d8ffff]/72 md:mx-0 md:text-left sm:text-xs">
                      <p>Press ENTER to open links</p>
                      <p>Press HOME to return back</p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2 text-left sm:flex sm:flex-wrap sm:gap-4">
                      {links.map(({ label, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith('mailto:') ? undefined : '_blank'}
                          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        className="inline-flex min-h-8 items-center gap-2 text-[11px] font-bold uppercase text-[#d8ffff] transition duration-150 hover:text-[#e23b48] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ffff] sm:text-xs"
                          onPointerDown={(event) => event.stopPropagation()}
                        >
                          <Icon aria-hidden="true" className="text-base" />
                          [{label}]
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#d8ffff]/16 pt-4">
                  <button
                    type="button"
                    aria-expanded={detailsOpen}
                    aria-controls="important-details"
                    onClick={() => setDetailsOpen((isOpen) => !isOpen)}
                    onPointerDown={(event) => event.stopPropagation()}
                    className="inline-flex min-h-9 items-center gap-2 border border-[#d8ffff]/28 bg-black px-3 py-2 text-[11px] font-bold uppercase text-[#d8ffff] transition duration-150 hover:border-[#e23b48]/70 hover:text-[#e23b48] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ffff] sm:text-xs"
                  >
                    Important details
                    <FiChevronDown
                      aria-hidden="true"
                      className={`text-sm transition duration-200 ${detailsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    id="important-details"
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      detailsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-4 grid gap-4 border border-[#d8ffff]/16 bg-black/70 p-4 text-left sm:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-bold uppercase text-[#f5d447]">
                            Certifications
                          </p>
                          <ul className="mt-2 space-y-1 text-[11px] text-[#d8ffff]/82 sm:text-xs">
                            {certifications.map((certification) => (
                              <li key={certification}>- {certification}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold uppercase text-[#f5d447]">Skills</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {coreSkills.slice(0, 6).map((skill) => (
                              <span
                                key={skill}
                                className="border border-[#d8ffff]/18 px-2 py-1 text-[10px] font-bold uppercase text-[#d8ffff]/78"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold uppercase text-[#f5d447]">
                            Useful links
                          </p>
                          <div className="mt-2 grid gap-1">
                            {usefulLinks.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                onPointerDown={(event) => event.stopPropagation()}
                                className="text-[11px] font-bold uppercase text-[#d8ffff] transition hover:text-[#e23b48] sm:text-xs"
                              >
                                [{link.label}]
                              </a>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold uppercase text-[#f5d447]">Projects</p>
                          <div className="mt-2 grid gap-1">
                            {portfolioProjects.map((project) => (
                              <a
                                key={project.slug}
                                href={project.href}
                                onPointerDown={(event) => event.stopPropagation()}
                                className="text-[11px] font-bold uppercase text-[#d8ffff] transition hover:text-[#e23b48] sm:text-xs"
                              >
                                [{project.shortTitle}]
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-up-1 border border-[#d8ffff]/20 bg-black/90 p-4 shadow-[0_0_28px_rgba(216,255,255,0.08)] transition duration-300 hover:border-[#d8ffff]/42 hover:shadow-[0_0_38px_rgba(216,255,255,0.13)] sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase text-[#d8ffff]/72">
                      Current Stage
                    </p>
                    <h2 className="mt-1 text-xl font-bold tracking-normal text-[#f1ffff] sm:text-3xl">
                      SOC Analyst Tier 1
                    </h2>
                  </div>
                  <span className="w-fit border border-[#d8ffff]/24 px-3 py-1.5 text-[11px] font-bold uppercase text-[#d8ffff]">
                    Boot Roadmap
                  </span>
                </div>

                <div className="relative mt-6 pb-2 pt-7 sm:mt-8 sm:pb-3">
                  <div className="absolute left-0 right-0 top-[38px] h-1 bg-[#d8ffff]" />
                  <div
                    className="absolute left-0 top-[38px] h-1 bg-[#f5d447] shadow-[0_0_18px_rgba(245,212,71,0.85),0_0_42px_rgba(245,212,71,0.32)]"
                    style={{ width: '13%' }}
                  />

                  <div className="relative grid grid-cols-5 gap-2">
                    {roadmapSteps.map((step, index) => {
                      const isCurrent = index === 0
                      const showLockedTitle = step === 'Security Architect'

                      return (
                        <div
                          key={step}
                          className="flex min-w-0 flex-col items-center gap-3 text-center"
                        >
                          <div
                            className={`flex h-5 w-5 items-center justify-center border transition duration-300 ${
                              isCurrent
                                ? 'border-[#f5d447] bg-[#f5d447] shadow-[0_0_16px_rgba(245,212,71,0.9),0_0_36px_rgba(245,212,71,0.34)]'
                                : 'border-[#d8ffff]/48 bg-black text-[#d8ffff]/62 shadow-[0_0_10px_rgba(216,255,255,0.08)]'
                            }`}
                          >
                            {!isCurrent && <FiLock aria-hidden="true" className="h-3 w-3" />}
                          </div>
                          {isCurrent || showLockedTitle ? (
                            <p
                              className={`text-[10px] font-semibold leading-4 sm:text-xs ${
                                isCurrent ? 'text-[#f5d447]' : 'text-[#d8ffff]/74'
                              }`}
                            >
                              {step}
                            </p>
                          ) : (
                            <div
                              aria-label={`${step} locked`}
                              className="grid w-full max-w-24 gap-1 opacity-75"
                            >
                              <span className="sr-only">{step} locked</span>
                              <span className="h-2 w-full bg-[#d8ffff]/26 [image-rendering:pixelated] shadow-[5px_0_0_rgba(216,255,255,0.08),-4px_2px_0_rgba(226,59,72,0.16)]" />
                              <span className="ml-2 h-2 w-3/4 bg-[#d8ffff]/18 [image-rendering:pixelated] shadow-[-6px_0_0_rgba(216,255,255,0.11),4px_2px_0_rgba(245,212,71,0.11)]" />
                              <span className="h-1.5 w-1/2 bg-[#e23b48]/20 [image-rendering:pixelated] shadow-[7px_1px_0_rgba(216,255,255,0.09)]" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div
            className={`pointer-events-none absolute z-10 whitespace-nowrap border border-[#d8ffff]/24 bg-black/88 px-4 py-2 font-mono text-xs font-bold uppercase text-white shadow-[0_0_20px_rgba(216,255,255,0.12)] transition duration-500 ${
              sodaHintVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: canvasImage.x - SODA_HINT_OFFSET_X,
              top: canvasImage.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            Shake me
          </div>

          {!sodaGone && (
            <div
              className={`pointer-events-none animate-fade-up-2 absolute z-10 w-[min(72vw,360px)] transition ${
                sodaFading ? 'opacity-0 duration-[2000ms]' : 'opacity-100 duration-300'
              }`}
              style={{
                left: canvasImage.x,
                top: canvasImage.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Image
                src={sodaOpened ? '/opened_soda.png' : canvasImage.src}
                alt={sodaOpened ? 'Opened can of soda' : canvasImage.alt}
                width={720}
                height={420}
                draggable={false}
                className="h-auto w-full object-contain"
              />
            </div>
          )}

          <div
            className={`pointer-events-none absolute z-10 max-w-[260px] border border-[#d8ffff]/24 bg-black/88 px-4 py-3 font-mono text-xs font-bold uppercase leading-5 text-white shadow-[0_0_20px_rgba(216,255,255,0.12)] transition duration-500 ${
              eyeHintVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: asciiEye.x + EYE_HINT_OFFSET_X,
              top: asciiEye.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            You can go to the right, try to find something in darkness, don't be scared
          </div>

          <div
            aria-label="Eye following cursor"
            ref={eyeRef}
            className="eye pointer-events-none absolute z-10 w-[min(80vw,520px)] -translate-x-1/2 -translate-y-1/2 select-none opacity-95"
            style={{
              left: asciiEye.x,
              top: asciiEye.y,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[50%] border border-white/0"
              style={{
                left: `calc(50% + ${EYE_PUPIL_CONTAINER_OFFSET_X}px)`,
                top: `calc(50% + ${EYE_PUPIL_CONTAINER_OFFSET_Y}px)`,
                width: EYE_PUPIL_CONTAINER_WIDTH,
                height: EYE_PUPIL_CONTAINER_HEIGHT,
              }}
            >
              <div
                ref={irisPupilRef}
                className="iris-pupil absolute left-1/2 top-1/2"
                style={{
                  width: EYE_PUPIL_SIZE,
                  height: EYE_PUPIL_SIZE,
                  marginLeft: -EYE_PUPIL_SIZE / 2,
                  marginTop: -EYE_PUPIL_SIZE / 2,
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'transform',
                }}
              >
                <Image
                  src="/eye/pupil.png"
                  alt=""
                  width={240}
                  height={240}
                  draggable={false}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <Image
              src="/eye/eye_no_inside.png"
              alt="Eye"
              width={1536}
              height={1024}
              draggable={false}
              className="relative z-10 h-auto w-full object-contain opacity-90 contrast-125 brightness-90"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-30 h-full w-16 bg-gradient-to-r from-red-500/22 to-transparent opacity-0 transition-opacity duration-300 ${
            nearEdges.left ? 'opacity-100' : ''
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed right-0 top-0 z-30 h-full w-16 bg-gradient-to-l from-red-500/22 to-transparent opacity-0 transition-opacity duration-300 ${
            nearEdges.right ? 'opacity-100' : ''
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-30 h-16 w-full bg-gradient-to-b from-red-500/22 to-transparent opacity-0 transition-opacity duration-300 ${
            nearEdges.top ? 'opacity-100' : ''
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed bottom-0 left-0 z-30 h-16 w-full bg-gradient-to-t from-red-500/22 to-transparent opacity-0 transition-opacity duration-300 ${
            nearEdges.bottom ? 'opacity-100' : ''
          }`}
        />
      </div>
    </main>
  )
}
