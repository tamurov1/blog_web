'use client'

import { useRef } from 'react'
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
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
        </section>


        {/* About Container */}
        <section className="w-full sm:w-2/3 animate-fade-up-2">
            <p className="text-gray-700 leading-7 bg-white/70 backdrop-blur p-6 rounded-lg shadow-lg border border-black/5">
                <b>Hello everyone!</b><br />
                Thanks for stopping by and taking the time to read through my scratches,
                thoughts, and digital ramblings - or as some might call it, a "Portfolio" or "About Page".
            <br /><br />
                My name is Dmytrii Tamurov - I write code, break systems (ethically), ask too many questions about the human mind, and lift heavy weights professionally.
                In simpler terms: I'm a Developer, an aspiring Cybersecurity Specialist, an amateur Researcher in Psychology, Philosophy, and Sociology, and a Professional Olympic Weightlifter.
            <br /><br />
                Currently, I live in Brampton, Canada, but I'm pretty mobile - mentally and geographically.
            <br /><br />
                Right now, I'm gnawing on knowledge in the Software Development and Network Engineering Advanced Diploma program, and fully planning to conquer the Cyber Security Honours Bachelor right after - both at Sheridan College.
                I learn fast, dive deep, and usually break something (in a good way) along the way.
            <br /><br />
                <b>Contact Me</b><br />
                If you want to chat, collaborate, or just throw some ideas around - you can reach me via email or X.
            <br /><br />
            </p>
        </section>
      </div>
    </main>
  )
}
