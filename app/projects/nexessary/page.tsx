import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import SiteHeader from '@/components/SiteHeader'
import { portfolioProjects } from '@/data/portfolio'

const project = portfolioProjects.find((item) => item.slug === 'nexessary')

export const metadata = {
  title: 'Nexessary Project',
  description:
    'Nexessary portfolio case study by Dmytrii Tamurov, covering product design and full-stack development for a structured workspace.',
}

export default function NexessaryProjectPage() {
  if (!project) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950 font-sans">
      <SiteHeader bordered />

      <article className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline">
          <FiArrowLeft aria-hidden="true" /> Back to projects
        </Link>

        <header className="mt-6 grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">{project.category}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <a
            href="https://nexessary.com"
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <Image
              src="/nexessary.png"
              alt="Nexessary project preview"
              width={420}
              height={260}
              className="h-auto w-full"
            />
          </a>
        </header>

        <div className="grid gap-8 py-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold">Product Link</h2>
            <a
              href="https://nexessary.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
            >
              nexessary.com <FiExternalLink aria-hidden="true" />
            </a>
          </aside>

          <div className="space-y-8">
            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Project Purpose</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Nexessary started from a practical problem: daily work is often scattered across too
                many tools. Tasks, notes, planning, communication, and documents become disconnected,
                which creates friction and makes real workflows harder to manage.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                The product is designed to bring the necessary parts of that workflow into a structured
                system that feels clear, organized, and usable for individuals and teams.
              </p>
            </section>

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Current Stage</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Nexessary is in its MVP stage. The current work is focused on core platform structure,
                interface improvements, task management, collaboration, and feedback from early users.
              </p>
            </section>

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Portfolio Value</h2>
              <ul className="mt-4 space-y-3 leading-7 text-slate-700">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}
