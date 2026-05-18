import Link from 'next/link'
import { FiArrowLeft, FiExternalLink, FiTerminal } from 'react-icons/fi'
import SiteHeader from '@/components/SiteHeader'
import { portfolioProjects } from '@/data/portfolio'

const project = portfolioProjects.find((item) => item.slug === 'automated-threat-detection-bash')

export const metadata = {
  title: 'Automated Threat Detection with Bash',
  description:
    'Security automation case study using Bash to parse Linux authentication logs, enrich suspicious IPs, block malicious IPs, and generate reports.',
}

export default function AutomatedThreatDetectionPage() {
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

        <header className="mt-6 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            <FiTerminal aria-hidden="true" /> {project.category}
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold">Project Snapshot</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">Primary Goal</dt>
                  <dd className="mt-1 text-slate-800">Automate repeatable log triage and response steps.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Environment</dt>
                  <dd className="mt-1 text-slate-800">Linux authentication logs and shell tooling.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Output</dt>
                  <dd className="mt-1 text-slate-800">Suspicious IP detection, enrichment, blocking logic, and reports.</dd>
                </div>
              </dl>
              {project.externalHref && (
                <a
                  href={project.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                >
                  GitHub repo <FiExternalLink aria-hidden="true" />
                </a>
              )}
            </div>
          </aside>

          <div className="space-y-8">
            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">What I Built</h2>
              <p className="mt-4 leading-7 text-slate-700">
                I built a Bash-based security automation workflow that parses Linux authentication
                logs, identifies suspicious IP activity, enriches those IPs through an external
                geolocation API, and prepares blocking actions with iptables.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                The project gave me practical experience with shell scripting, Linux administration,
                networking, security operations logic, and securely pushing code to GitHub over SSH.
              </p>
            </section>

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Core Workflow</h2>
              <ol className="mt-4 space-y-3 leading-7 text-slate-700">
                <li>Parse Linux authentication logs for suspicious login activity.</li>
                <li>Extract and enrich suspicious IP addresses with location data.</li>
                <li>Apply dynamic blocking logic with iptables after review and configuration.</li>
                <li>Generate daily reports so the findings are easy to inspect and reuse.</li>
              </ol>
            </section>

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">What It Demonstrates</h2>
              <ul className="mt-4 space-y-3 leading-7 text-slate-700">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
                <li>Understands the difference between lab automation and production-safe response controls.</li>
              </ul>
            </section>

            <section className="rounded-md border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-semibold">Implementation Note</h2>
              <p className="mt-3 leading-7 text-slate-700">
                The script uses example IPs and requires system-specific configuration before testing.
                That is important for safety because firewall automation should be validated in the
                target environment before it affects real access.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}
