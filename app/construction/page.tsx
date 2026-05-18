import Image from 'next/image'
import type { Metadata } from 'next'
import { FiExternalLink, FiLinkedin, FiMail, FiYoutube } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Under Construction',
  description:
    'Dmytrii Tamurov portfolio is temporarily under construction. Connect through LinkedIn, YouTube, Nexessary, or email.',
  alternates: {
    canonical: 'https://dmytriitamurov.com/construction',
  },
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

export default function ConstructionPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <section className="relative flex min-h-screen items-center px-5 py-10 sm:px-8">
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        >
          <source src="/videos/construction.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/70" />

        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[0.86fr_1.14fr]">
          <div className="flex justify-center md:justify-start">
            <div className="relative h-48 w-48 sm:h-60 sm:w-60">
              <div className="absolute inset-0 rounded-full border border-blue-200 bg-white shadow-[0_24px_60px_rgba(37,99,235,0.14)]" />
              <Image
                src="/pic-ava.png"
                alt="Dmytrii Tamurov"
                width={240}
                height={240}
                priority
                className="relative h-full w-full rounded-full object-cover object-[center_21%] p-2"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Dmytrii Tamurov
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg md:mx-0">
              Portfolio is under construction. The core links are still available while the site is
              being rebuilt.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start">
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                >
                  <Icon aria-hidden="true" className="text-lg" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
