'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
import BackgroundFX from '@/components/BackgroundFX'
import PostLikeButton from '@/components/PostLikeButton'
import SiteHeader from '@/components/SiteHeader'

export default function AiMergePage() {
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
            <h1 className="text-3xl font-bold text-blue-600 mb-4">AI Merge</h1>
            <p className="text-sm text-gray-500">By Dmytrii Tamurov | March 5, 2026</p>
            <PostLikeButton postId="ai-merge" />

            <div className="mt-6 space-y-3 [&_p]:m-0 [&_p]:border-l-2 [&_p]:border-gray-300 [&_p]:pl-4 [&_p]:leading-7">
              <p><strong>Disclaimer:</strong></p>
              <p>This is my personal blog and these are simply my thoughts and observations.</p>
              <br></br>

              <p>Human merge with AI is inevitable.</p>
              <p>The real question is not if, but how and when it will happen.</p>

              <p>Right now we are still in the early stages, but something interesting is already happening.</p>
              <p>People are slowly getting used to the existence of AI.</p>
              <p>Some people are excited about it, some are skeptical, and some are honestly scared.</p>
              <p>And that is fair.</p>

              <p>But if you look at what is actually happening in the world, there is a clear signal.</p>
              <p>Huge amounts of money, talent, and research are being invested into AI development.</p>
              <p>When that much energy goes into something, it usually means the direction is not random.</p>

              <p>Something big is being built.</p>

              <p>Personally, I believe that some form of human and AI merge will eventually happen.</p>
              <p>I do not know exactly what form it will take.</p>
              <p>Maybe brain-computer interfaces.</p>
              <p>Maybe AI integrated into our daily thinking tools.</p>
              <p>Maybe something completely different that we cannot even imagine properly yet.</p>

              <p>And like most powerful technologies, it will most likely be both good and bad at the same time.</p>

              <p>There are already tons of discussions around this topic.</p>
              <p>Ethics, security, control, human identity, what it means for civilization, and whether humans will remain human in the way we understand it today.</p>

              <p>There are a lot of variables.</p>
              <p>And a lot of unanswered questions.</p>

              <p>But one thing seems obvious to me.</p>

              <p>Instead of ignoring AI or being afraid of it, it makes much more sense to learn how to use it.</p>

              <p>Because if people do not learn how to work with AI themselves, eventually someone else will teach them how they are allowed to use it.</p>
              <p>And those are two very different situations.</p>

              <p><strong>Learn how to use AI.</strong></p>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
