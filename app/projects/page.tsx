import Link from 'next/link'
import { FiArrowRight, FiExternalLink } from 'react-icons/fi'
import SiteHeader from '@/components/SiteHeader'
import { portfolioProjects } from '@/data/portfolio'

export const metadata = {
  title: 'Cybersecurity Projects',
  description:
    'Cybersecurity and development portfolio projects by Dmytrii Tamurov, including Snort detection, Bash threat automation, and Nexessary.',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950 font-sans">
      <SiteHeader bordered />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          Portfolio Evidence
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Cybersecurity and Development Projects</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Hands-on work focused on detection, network defense, Linux automation, documentation,
          and software products. Each case study explains the environment, tools, result, and
          what the project demonstrates.
        </p>

        <div className="mt-8 grid gap-5">
          {portfolioProjects.map((project) => (
            <article key={project.slug} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <span>{project.category}</span>
                    <time dateTime={project.date}>{project.date}</time>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950">{project.title}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-600">{project.summary}</p>
                </div>
                <Link
                  href={project.href}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Case Study <FiArrowRight aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                    {item}
                  </span>
                ))}
              </div>

              <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700 md:grid-cols-3">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                    {outcome}
                  </li>
                ))}
              </ul>

              {project.externalHref && (
                <a
                  href={project.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                >
                  External project link <FiExternalLink aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
