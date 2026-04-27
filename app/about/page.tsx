'use client'

import { useRef } from 'react'
import Image from "next/image";
import { FaLinkedin, FaYoutube } from 'react-icons/fa'
import BackgroundFX from '@/components/BackgroundFX'
import SiteHeader from '@/components/SiteHeader'

export default function AboutPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />
      <SiteHeader className="-mx-6 -mt-6 mb-12 animate-fade-up sm:-mx-12 sm:-mt-12" />

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-12 relative z-10">
        {/* Profile Block */}
        <section className="w-full sm:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left animate-fade-up-1">
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
            Cybersecurity research, threat intelligence, vulnerability analysis, and practical IT defense.
          </p>

          <div className="flex flex-col mt-4 gap-2">
            <a href="https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600">
              <FaYoutube /> YouTube
            </a>
            <a href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274" className="flex items-center gap-2 hover:text-blue-700">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>


        {/* About Container */}
        <section className="w-full sm:w-2/3 animate-fade-up-2">
            <p className="text-gray-700 leading-7 bg-white/70 backdrop-blur p-6 rounded-lg shadow-lg border border-black/5">
                <b>Hello everyone!</b><br />
                This site is focused on cybersecurity and IT: research notes, threat coverage, vulnerability writeups, and practical defense thinking.
            <br /><br />
                My name is Dmytrii Tamurov. I work across software development, security research, SOC analysis, network fundamentals, and application security. The goal here is to document technical work clearly enough that defenders, builders, and students can use it.
            <br /><br />
                Currently, I live in Brampton, Canada, and study Software Development and Network Engineering at Sheridan College while preparing for deeper cybersecurity work.
            <br /><br />
                The writing here focuses on vulnerability research, threat intelligence, secure development, cloud and endpoint risk, incident response notes, and the systems that support modern IT operations.
            <br /><br />
                <b>Contact Me</b><br />
                If you want to discuss cybersecurity research, IT projects, or collaboration, LinkedIn and YouTube are the best public channels listed here.
            <br /><br />
            </p>
        </section>
      </div>
    </main>
  )
}
