'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
import BackgroundFX from '@/components/BackgroundFX'
import PostLikeButton from '@/components/PostLikeButton'
import SiteHeader from '@/components/SiteHeader'

export default function HumanFearPage() {
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
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Human Fear</h1>
            <p className="text-sm text-gray-500">By Dmytrii Tamurov | March 10, 2026 | 2 mins read</p>
            <PostLikeButton postId="human-fear" />

            <div className="mt-6 space-y-3 [&_p]:m-0 [&_p]:border-l-2 [&_p]:border-gray-300 [&_p]:pl-4 [&_p]:leading-7 [&_ul]:my-2 [&_ul]:border-l-2 [&_ul]:border-gray-300 [&_ul]:pl-8 [&_li]:my-1">
              <p>Fear.</p>
              <p>An instrument to build or destroy.</p>
              <p>Is it a feeling that tells us to escape and avoid?</p>
              <p>Or could it also be a signal to build and create?</p>

              <p>Fear can tell us a lot about ourselves.</p>
              <p>It is a mechanism that exists in our nature, supposedly to protect us.</p>
              <p>Or at least that is what we were told.</p>
              <p>But the real question is: protect us from what exactly?</p>

              <p>If you pay attention, we face fear almost every day.</p>
              <p>The more active or ambitious a person is, the more often fear appears.</p>

              <p>First, let&apos;s talk about the obvious side of fear: fear as a mechanism of escape or avoidance.</p>

              <p>Thousands of years ago, humans lived in an environment where survival depended on reacting quickly.</p>
              <p>If you saw a predator, fear would trigger immediate changes in your body: increased blood flow, heightened awareness, adrenaline.</p>
              <p>That reaction could literally save your life.</p>
              <p>Back then, fear had a very clear purpose.</p>

              <p>But today we rarely face predators in the forest.</p>
              <p>Yet we still experience fear constantly.</p>
              <p>Why?</p>

              <p>The answer is simple: the unknown.</p>
              <p>When the brain encounters too many unknown variables about the future, it automatically triggers fear.</p>
              <p>It begins calculating risks.</p>
              <p>If the mind is not trained to interpret fear differently, it will default to the safest evolutionary strategy:</p>
              <p>avoid.</p>
              <p>escape.</p>
              <p>postpone.</p>

              <p>We can fear many things:</p>
              <ul className="list-disc">
                <li>regret</li>
                <li>deadlines</li>
                <li>rejection</li>
                <li>responsibility</li>
                <li>failure</li>
              </ul>
              <p>Sometimes people even fear progress itself.</p>
              <p>And paradoxically, some people even develop a fear of fear.</p>
              <p>The brain begins associating discomfort with danger, even when no real danger exists.</p>

              <p>But there is another side of fear.</p>
              <p>There are people who use fear as an instrument to build and create.</p>
              <p>Why?</p>
              <p>Because they interpret the signal differently.</p>
              <p>Fear -&gt; unknown.</p>
              <p>Unknown -&gt; experiment.</p>
              <p>Experiment -&gt; new information.</p>
              <p>And information is the foundation of learning.</p>
              <p>So instead of escaping fear, they step into it.</p>
              <p>Every fear becomes a data point.</p>

              <p>This way of thinking is not new.</p>
              <p>Many thinkers and builders have spoken about it.</p>
              <p>The philosopher Friedrich Nietzsche wrote that growth often lies exactly in the places that challenge us the most.</p>
              <p>The psychologist Carl Jung said something very similar: &quot;Where your fear is, there lies your task.&quot;</p>
              <p>Even modern thinkers talk about this mechanism.</p>
              <p>The entrepreneur Naval Ravikant often describes fear as a signal pointing toward areas where growth and opportunity may exist.</p>

              <p>Fear is not just a warning system.</p>
              <p>It can also be a navigation system.</p>

              <p>But using fear in this way requires something important: the right mindset.</p>
              <p>You need to understand that fear is not always telling you to run away.</p>
              <p>Sometimes it is simply telling you:</p>
              <p>there is something here you have never explored before.</p>

              <p>Building anything meaningful - a project, a company, a new life direction - requires stepping into those unknowns repeatedly.</p>

              <p>So the real question is not:</p>
              <p>&quot;Do you feel fear?&quot;</p>
              <p>Everyone does.</p>
              <p>The real question is:</p>
              <p>What do you do with it?</p>
              <p>Do you escape?</p>
              <p>Or do you use it as an instrument to build something new?</p>

              <p>Because in the end, fear itself is neutral.</p>
              <p>It becomes destructive or constructive depending on how you interpret it.</p>
              <p>And that interpretation is something you can train.</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
