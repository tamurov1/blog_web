'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import BackgroundFX from '@/components/BackgroundFX'
import PostLikeButton from '@/components/PostLikeButton'

export default function ParadoxOfGoodAndBadPage() {
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
        <nav className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm">
          <Link href="/" className="tmk-nav-link">Home</Link>
          <Link href="/map" className="tmk-nav-link">Map</Link>
          <Link href="/cybernews" className="tmk-nav-link tmk-nav-link-featured">Cybernews</Link>
          <Link href="/about" className="tmk-nav-link">About</Link>
          <Link href="/shop" className="tmk-nav-link">Shop</Link>
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
            <h1 className="text-3xl font-bold text-blue-600 mb-4">The Paradox of Good and Bad</h1>
            <p className="text-sm text-gray-500">By Dmytrii Tamurov | March 5, 2026</p>
            <PostLikeButton postId="paradox-of-good-and-bad" />

            <div className="mt-6 space-y-3 [&_p]:m-0 [&_p]:border-l-2 [&_p]:border-gray-300 [&_p]:pl-4 [&_p]:leading-7 [&_ul]:my-2 [&_ul]:border-l-2 [&_ul]:border-gray-300 [&_ul]:pl-8 [&_li]:my-1">
              <p>Good is not always good.</p>
              <p>Sometimes it is actually bad.</p>
              <p>And bad is not always bad.</p>
              <p>Sometimes it ends up being good.</p>

              <p>Most people know this on some level.</p>
              <p>But strangely, they do not really understand it.</p>

              <p>As humans we constantly categorize things.</p>
              <p>Our brain loves labels.</p>
              <p>We group, name, and simplify everything around us because that is how we make sense of the world.</p>

              <p>One of the deepest and most common labels we use is simple:</p>
              <p>Good and Bad.</p>

              <p>Think about the last time you judged something as good or bad.</p>
              <p>Most likely it was today.</p>

              <p>This comparison mechanism is fundamental.</p>
              <p>It helps us decide what to do and what not to do.</p>
              <p>It is supposed to help us move toward better decisions.</p>

              <p>But here is the interesting question:</p>
              <p>Is it actually always helping?</p>
              <p>Sometimes yes.</p>
              <p>Sometimes not really.</p>

              <p>Most of the time we judge things based on how we feel in the moment.</p>
              <p>Something feels good, we label it good.</p>
              <p>Something feels uncomfortable, we label it bad.</p>

              <p>A smaller number of people try to look further into the future.</p>
              <p>They can recognize that something uncomfortable now might actually produce something valuable later.</p>

              <p>Either way, the mechanism itself is important.</p>
              <p>Civilization probably would not exist without it.</p>

              <h2 className="mt-10 text-2xl">Where the Paradox Starts</h2>
              <p>If good is good, and bad is bad, then logically we should always choose the good option and avoid the bad one.</p>
              <p>Sounds simple.</p>
              <p>But reality is not that simple.</p>

              <p>Good and Bad are extremely subjective categories.</p>
              <p>To understand them properly, you need the ability to look at things from multiple perspectives.</p>
              <p>Only then the full picture starts to appear.</p>

              <h2 className="mt-10 text-2xl">A Modern Example: Social Media</h2>
              <p>Some people believe social media is good.</p>
              <p>Others believe it is bad.</p>
              <p>And interestingly enough, both sides are correct.</p>

              <h3 className="mt-8 text-xl">Why Social Media Can Be Good</h3>
              <ul className="list-disc">
                <li>Some people literally make their living through social media.</li>
                <li>It provides entertainment and connection.</li>
                <li>It can be used as discipline training for attention control.</li>
              </ul>

              <h3 className="mt-8 text-xl">Why Social Media Can Be Bad</h3>
              <ul className="list-disc">
                <li>Many people become addicted to endless scrolling.</li>
                <li>It can create comparison and dissatisfaction.</li>
                <li>It can reduce focus and distort how we evaluate our own life.</li>
              </ul>

              <h2 className="mt-10 text-2xl">So, Good or Bad?</h2>
              <p>The honest answer is: both.</p>
              <p>It depends on perspective and on the person using it.</p>
              <p>The same tool can build someone&apos;s career or destroy someone&apos;s focus.</p>
              <p>The same environment can train discipline or create addiction.</p>

              <p>In many cases when we decide something is good or bad, we are actually just describing our current perspective, not the full truth.</p>
              <p>To truly understand a situation you have to zoom out and look from multiple angles.</p>

              <p>And even then, the funny part is:</p>
              <p>You still have to choose.</p>
              <p>And once you choose, you will probably justify why your choice was the right one.</p>

              <p>Because just like good and bad, even right and wrong are often subjective.</p>
              <p>Ironically, those very ideas helped humanity build civilization: laws, fairness, order, cooperation.</p>
              <p>But the moment you start thinking deeper about them, a little bit of philosophical chaos appears.</p>

              <p>Which is probably a good thing.</p>
              <p>Or maybe a bad thing.</p>
              <p>Depends on your perspective.</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
