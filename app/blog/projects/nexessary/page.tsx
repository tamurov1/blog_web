'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
import BackgroundFX from '@/components/BackgroundFX'
import PostLikeButton from '@/components/PostLikeButton'
import SiteHeader from '@/components/SiteHeader'

export default function NexessaryPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />

      <SiteHeader className="-mx-6 -mt-6 mb-12 animate-fade-up sm:-mx-12 sm:-mt-12" />

      <div className="flex flex-col sm:flex-row gap-12 relative z-10">
        <aside className="w-full sm:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left animate-fade-up-1">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-gray-300 mb-4">
            <Image
              src="/pic-ava.png"
              alt="Dmytrii Tamurov"
              width={150}
              height={150}
              className="pointer-events-none select-none object-cover scale-100"
              draggable={false}
              priority
            />
          </div>

          <h1 className="text-xl font-semibold">Dmytrii Tamurov</h1>
          <p className="mt-2 text-gray-600">
            Cybersecurity, development, Olympic weightlifting - thoughts, blogs, and ideas in one place.
          </p>

          <div className="flex flex-col mt-4 gap-2">
            <a
              href="https://nexessary.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-700"
            >
              <Image
                src="/nexessary.png"
                alt="Nexessary"
                width={16}
                height={16}
                className="h-4 w-4 rounded-sm object-cover"
              />
              Nexessary
            </a>
            <a href="https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600">
              <FaYoutube /> YouTube
            </a>
            <a href="https://x.com/tamurofff" className="flex items-center gap-2 hover:text-blue-500">
              <FaTwitter /> X
            </a>
            <a href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274" className="flex items-center gap-2 hover:text-blue-700">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </aside>

        <section className="w-full sm:w-2/3 animate-fade-up-2">
          <article className="prose prose-lg max-w-none text-gray-800 bg-white/70 backdrop-blur p-6 rounded-lg shadow-lg border border-black/5">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Nexessary: Building a Structured Workspace for Real Workflows</h1>
            <p className="text-sm text-gray-500">By Dmytrii Tamurov | March 4, 2026</p>
            <PostLikeButton postId="nexessary-building-a-structured-workspace" />

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
              <div className="mt-3 flex flex-col sm:flex-row gap-4 sm:items-center">
                <a
                  href="https://nexessary.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <Image
                    src="/nexessary.png"
                    alt="Nexessary preview"
                    width={240}
                    height={140}
                    className="h-auto w-full sm:w-[240px] object-cover"
                  />
                </a>
                <p className="m-0">
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
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
