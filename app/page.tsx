import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import HeroTileScroller from '@/components/HeroTileScroller'
import SiteHeader from '@/components/SiteHeader'
import { portfolioProjects } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'SOC Analyst Cybersecurity Portfolio',
  description:
    'SOC Analyst-focused cybersecurity portfolio by Dmytrii Tamurov, covering SIEM-style analysis, network detection, incident reporting, Linux automation, threat research, and a long-term path toward cybersecurity architecture.',
  alternates: {
    canonical: 'https://dmytriitamurov.com',
  },
}

export default function HomePage() {
  const featuredProjects = portfolioProjects.slice(0, 3)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://dmytriitamurov.com/#person',
        name: 'Dmytrii Tamurov',
        url: 'https://dmytriitamurov.com',
        jobTitle: 'SOC Analyst-Focused Cybersecurity Professional',
        description:
          'Cybersecurity portfolio focused on SOC analysis, threat detection, incident reporting, Linux security automation, vulnerability research, and a long-term path toward strategic cybersecurity architecture.',
        knowsAbout: [
          'SOC analysis',
          'SIEM investigation',
          'Incident response',
          'Network security',
          'Threat detection',
          'Vulnerability research',
          'Linux administration',
          'Security automation',
          'Cloud security fundamentals',
          'IAM fundamentals',
          'Threat modeling',
          'Full-stack development',
        ],
        sameAs: [
          'https://nexessary.com',
          'https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274/',
          'https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA',
        ],
      },
      ...portfolioProjects.map((project) => ({
        '@type': 'CreativeWork',
        name: project.title,
        url: `https://dmytriitamurov.com${project.href}`,
        creator: {
          '@id': 'https://dmytriitamurov.com/#person',
        },
        about: project.category,
        dateCreated: project.date,
        description: project.summary,
      })),
    ],
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950 font-sans">
      <Script
        id="structured-data-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader bordered className="sticky top-0" />

      <section className="relative overflow-hidden bg-[#f8fafc] text-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_86%_62%,rgba(20,184,166,0.12),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.42] [background-image:linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-10 md:grid-cols-[0.78fr_1.22fr] md:gap-10 md:py-14">
          <div className="flex flex-col items-center justify-center gap-5 text-center md:items-start md:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row md:items-center">
              <Image
                src="/pic-ava.png"
                alt="Dmytrii Tamurov"
                width={168}
                height={168}
                priority
                className="h-28 w-28 scale-100 rounded-full border-2 border-white bg-white object-cover shadow-[0_18px_40px_rgba(15,23,42,0.14)] sm:h-32 sm:w-32"
              />
              <a
                href="mailto:contact@dmytriitamurov.com?subject=Resume%20Request%20-%20Dmytrii%20Tamurov"
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-md border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:border-blue-300 hover:text-blue-700 sm:w-fit"
              >
                <FiMail aria-hidden="true" /> Request cybersecurity resume
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-sm">
                SOC Analyst-Focused Cybersecurity Portfolio
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Dmytrii Tamurov
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 md:mx-0">
                Building practical SOC analyst capability through threat detection, network defense,
                incident reporting, Linux automation, and security research, with a long-term path
                toward strategic cybersecurity architecture.
              </p>
            </div>
            <div className="grid w-full max-w-xs gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View Security Projects <FiArrowRight aria-hidden="true" />
              </Link>
              <a
                href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
              >
                <FiLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>

          <HeroTileScroller />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                SOC Evidence
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Cybersecurity Projects</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
              All security projects <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={project.href}
                className="rounded-md border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                  {project.category}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-950">{project.shortTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((item) => (
                    <span key={item} className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">SOC Analyst Snapshot</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This portfolio is organized for cybersecurity recruiters and SOC teams to quickly
            evaluate my detection mindset, investigation workflow, technical documentation, and
            readiness for entry-level SOC analyst work.
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Current Foundation</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Software Development and Network Engineering at Sheridan College, with focused practice
            in networking, Linux, scripting, detection labs, and security reporting.
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Professional Direction</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Target path: SOC Analyst to Security Engineer, design-oriented security work, security
            leadership, and strategic cybersecurity architecture.
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href="https://nexessary.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-700 hover:underline">
              Nexessary
            </a>
            <a href="https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-700 hover:underline">
              YouTube
            </a>
            <a href="https://lnkd.in/gtwPd4pB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-700 hover:underline">
              <FiGithub aria-hidden="true" /> Threat detection repo
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
