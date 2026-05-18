import Image from 'next/image'
import { FiLinkedin, FiMail, FiYoutube } from 'react-icons/fi'
import SiteHeader from '@/components/SiteHeader'
import { coreSkills } from '@/data/portfolio'

export const metadata = {
  title: 'About',
  description:
    'About Dmytrii Tamurov, a cybersecurity and software development student focused on security operations, network defense, and practical development.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950 font-sans">
      <SiteHeader bordered />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
          <Image
            src="/pic-ava.png"
            alt="Dmytrii Tamurov"
            width={150}
            height={150}
            priority
            className="h-36 w-36 rounded-md border border-slate-200 object-cover"
          />
          <h1 className="mt-5 text-2xl font-semibold">Dmytrii Tamurov</h1>
          <p className="mt-2 leading-7 text-slate-700">
            Cybersecurity and software development student based in Brampton, Canada.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a
              href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 hover:underline"
            >
              <FiLinkedin aria-hidden="true" /> LinkedIn
            </a>
            <a
              href="https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 hover:underline"
            >
              <FiYoutube aria-hidden="true" /> YouTube
            </a>
            <a
              href="mailto:contact@dmytriitamurov.com"
              className="inline-flex items-center gap-2 text-blue-700 hover:underline"
            >
              <FiMail aria-hidden="true" /> contact@dmytriitamurov.com
            </a>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">About</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Cybersecurity, IT, and Development</h2>
            <p className="mt-4 leading-7 text-slate-700">
              I study Software Development and Network Engineering at Sheridan College and focus my
              portfolio on practical cybersecurity work: network detection, incident documentation,
              Linux automation, vulnerability research, and secure development.
            </p>
            <p className="mt-4 leading-7 text-slate-700">
              My goal is to build evidence through hands-on projects that are useful to employers:
              clear lab environments, readable reports, realistic security impact, and concrete
              recommendations instead of only theory.
            </p>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <span key={skill} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">What This Website Is For</h2>
            <p className="mt-4 leading-7 text-slate-700">
              The website is now structured as a cybersecurity career portfolio. Projects are the
              primary evidence, threat notes support security awareness, and the about page gives
              employers a direct path to understand my focus and contact me.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
