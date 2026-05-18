import Image from 'next/image'
import Link from 'next/link'
import { FiArrowLeft, FiShield } from 'react-icons/fi'
import SiteHeader from '@/components/SiteHeader'
import { portfolioProjects } from '@/data/portfolio'

const project = portfolioProjects.find((item) => item.slug === 'snort-ssh-detection-lab')

export const metadata = {
  title: 'Snort SSH Detection Lab',
  description:
    'Snort intrusion detection lab case study covering SSH traffic detection, alert evidence, impact, and recommendations.',
}

const reportImages = [
  { src: '/projects/snort/1.png', alt: 'Snort lab report cover page' },
  { src: '/projects/snort/2.png', alt: 'Snort lab report table of contents' },
  { src: '/projects/snort/3.jpg', alt: 'Snort report overview and incident metadata' },
  { src: '/projects/snort/4.jpg', alt: 'Snort report network topology and alert evidence' },
  { src: '/projects/snort/5.jpg', alt: 'Snort report impact and recommendations' },
  { src: '/projects/snort/6.jpg', alt: 'Snort report conclusion' },
]

export default function SnortProjectPage() {
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
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            <FiShield aria-hidden="true" /> {project.category}
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

        <div className="grid gap-8 py-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-4">
            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold">Lab Setup</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">Sensor</dt>
                  <dd className="mt-1 text-slate-800">Kali Linux VM running Snort 3</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Endpoints</dt>
                  <dd className="mt-1 text-slate-800">Two Windows 11 hosts on the LAN</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Detection Target</dt>
                  <dd className="mt-1 text-slate-800">SSH traffic over TCP/22</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Date</dt>
                  <dd className="mt-1 text-slate-800">August 4, 2025</dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="space-y-8">
            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">What I Built</h2>
              <p className="mt-4 leading-7 text-slate-700">
                I configured Snort as a network intrusion detection sensor in a controlled LAN and
                wrote a custom detection rule for SSH traffic. During testing, a Windows 11 host
                initiated an SSH session to the Kali VM, and Snort generated an alert immediately.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                The project was documented as a security report with an executive summary, device
                inventory, timeline, alert evidence, impact analysis, and recommendations for lab
                and real-world hardening.
              </p>
            </section>

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Detection Results</h2>
              <ul className="mt-4 space-y-3 leading-7 text-slate-700">
                <li>Custom rule triggered on SSH traffic from the Windows host to the Kali system.</li>
                <li>Alert evidence confirmed Snort was operating as a NIDS: detecting and reporting, not blocking.</li>
                <li>The incident was assessed as a test case with realistic impact if the same behavior appeared unexpectedly in production.</li>
              </ul>
            </section>

            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Security Recommendations</h2>
              <ul className="mt-4 space-y-3 leading-7 text-slate-700">
                <li>Restrict SSH access at the firewall to approved trusted IP addresses.</li>
                <li>Disable password-based SSH logins and enforce key-based authentication.</li>
                <li>Monitor authentication logs and centralize alerts into a SIEM-style workflow.</li>
                <li>Test Snort IPS mode for controlled blocking scenarios after validating rules.</li>
              </ul>
            </section>
          </div>
        </div>

        <section className="border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-semibold">Report Evidence</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            The screenshots below show the report created for the lab, including topology, metadata,
            alert output, impact assessment, and conclusion.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reportImages.map((image, index) => (
              <figure key={image.src} className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={368}
                  height={512}
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-slate-200 px-3 py-2 text-sm text-slate-600">
                  Report page {index + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
