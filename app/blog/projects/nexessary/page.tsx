'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import BackgroundFX from '@/components/BackgroundFX'

export default function NexessaryPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />

      <header className="flex justify-between items-center mb-12 relative z-10 animate-fade-up">
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
        <nav className="flex gap-4 items-center text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" aria-label="Search" />
        </nav>
      </header>

      <div className="flex flex-col sm:flex-row gap-12 relative z-10">
        <aside className="w-full sm:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left animate-fade-up-1">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-gray-300 mb-4">
            <Image
              src="/pic-ava.png"
              alt="Dmytrii Tamurov"
              width={150}
              height={150}
              className="object-cover scale-100"
              priority
            />
          </div>

          <h1 className="text-xl font-semibold">Dmytrii Tamurov</h1>
          <p className="mt-2 text-gray-600">
            Cybersecurity, development, Olympic weightlifting - thoughts, blogs, and ideas in one place.
          </p>

          <div className="flex flex-col mt-4 gap-2 text-sm">
            <a href="https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600">
              <FaYoutube /> YouTube
            </a>
            <a href="https://x.com/Dmytriitmk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-500">
              <FaTwitter /> X (formerly Twitter)
            </a>
            <a href="https://github.com/tamurov1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-700">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </aside>

        <section className="w-full sm:w-2/3 animate-fade-up-2">
          <article className="prose prose-lg max-w-none text-gray-800 bg-white/70 backdrop-blur p-6 rounded-lg shadow-lg border border-black/5">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Nexessary: Building a Structured Workspace for Real Workflows</h1>
            <p className="text-sm text-gray-500">By Dmytrii Tamurov | March 4, 2026</p>

            <p>
              Nexessary is a web application that I started building from a simple idea: most people work with too many tools that do not actually connect well with each other.
              Tasks, notes, planning, communication, and documents often end up scattered across different platforms, which creates unnecessary complexity.
            </p>

            <p>
              The goal of Nexessary is to bring the necessary parts of that workflow into one structured system.
              Instead of switching between multiple apps, the user can organize work, ideas, and communication inside one environment that is simple and logical.
            </p>

            <h2 className="mt-10 text-2xl">Current Stage</h2>
            <p>
              Right now Nexessary is in its MVP stage, where the main focus is building the core structure of the platform and testing it with early users.
              The system is designed to support task management, collaboration, and structured organization of work in a way that is flexible but still clear.
            </p>

            <h2 className="mt-10 text-2xl">Project Focus</h2>
            <p>
              My focus with this project is not just to create another productivity tool, but to design a system that reduces noise and allows people to focus on what actually matters.
              The long-term goal is to develop Nexessary into a platform that helps individuals and teams operate in a more organized and efficient way.
            </p>

            <p>
              At this stage I am actively developing features, improving the interface, and gathering feedback from early users to understand what works best in real workflows.
            </p>

            <div className="mt-8 p-4 rounded-md border border-blue-200 bg-blue-50/70">
              <h3 className="text-lg font-semibold text-blue-700 m-0">Project Link</h3>
              <p className="mt-2 mb-0">
                Website:{' '}
                <a
                  href="https://nexessary.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  https://nexessary.com
                </a>
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
