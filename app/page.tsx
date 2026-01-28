'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import BlogMap from '@/components/BlogMap'
import PostList from '@/components/PostList'
import BackgroundFX from '@/components/BackgroundFX'

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const mainRef = useRef<HTMLElement | null>(null)
  const fullBio =
    'Cybersecurity, development, Olympic weightlifting - thoughts, blogs, and ideas in one place.'
  const [typedBio, setTypedBio] = useState('')

  useEffect(() => {
    const totalDurationMs = 4000
    const stepMs = Math.max(20, Math.floor(totalDurationMs / fullBio.length))
    let index = 0

    const timer = window.setInterval(() => {
      index += 1
      setTypedBio(fullBio.slice(0, index))
      if (index >= fullBio.length) {
        window.clearInterval(timer)
      }
    }, stepMs)

    return () => window.clearInterval(timer)
  }, [fullBio])

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />

      {/* Header */}
      <div className="flex justify-between items-center mb-12 relative z-10 animate-fade-up">
        <div className="text-2xl font-bold tracking-tight select-none cursor-default">
          TMK
        </div>
        <nav className="flex gap-4 items-center text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" />
        </nav>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-12 relative z-10">
        {/* Profile Block */}
        <section className="w-full sm:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left animate-fade-up-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-700 shadow-sm backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            Online and active
          </div>

          <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-gray-300 mb-4 shadow-lg ring-4 ring-white/70">
            <Image
              src="/pic-ava.jpg"
              alt="Dmytrii Tamurov"
              width={150}
              height={150}
              className="object-cover scale-200"
              priority
            />
          </div>

          <h1 className="text-xl font-semibold">Dmytrii Tamurov</h1>
          <p className="mt-2 text-gray-600 min-h-[3rem]" aria-live="polite">
            {typedBio}
            <span className="inline-block w-[1px] h-[1em] align-[-0.1em] bg-gray-500 ml-0.5 animate-pulse-soft" />
          </p>

          <div className="flex flex-wrap mt-4 gap-2 justify-center sm:justify-start">
            <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-700 shadow-sm backdrop-blur">
              Security Research
            </span>
            <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-700 shadow-sm backdrop-blur">
              Full-Stack Dev
            </span>
            <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-700 shadow-sm backdrop-blur">
              Olympic Lifter
            </span>
          </div>

          <div className="flex flex-col mt-4 gap-2">
            <a href="https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600">
              <FaYoutube /> YouTube
            </a>
            <a href="https://twitter.com/" className="flex items-center gap-2 hover:text-blue-500">
              <FaTwitter /> Twitter
            </a>
            <a href="https://github.com/" className="flex items-center gap-2 hover:text-gray-700">
              <FaGithub /> GitHub
            </a>
            <a href="https://linkedin.com/" className="flex items-center gap-2 hover:text-blue-700">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>

        {/* Blog Map / Post List */}
        <section className="w-full sm:w-2/3 animate-fade-up-2">
          {/* Toggle Button */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
              className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition shadow-sm bg-white/70 backdrop-blur"
            >
              Switch to {viewMode === 'map' ? 'List View' : 'Map View'}
            </button>
          </div>

          {/* Content View */}
          <div className="border border-dashed border-gray-400 p-4 rounded-md overflow-hidden h-[400px] bg-white/70 shadow-lg backdrop-blur">
            {viewMode === 'map' ? <BlogMap /> : <PostList />}
          </div>

        </section>
      </div>
    </main>
  )
}
