import Link from 'next/link'
import { FiExternalLink, FiSearch } from 'react-icons/fi'

export default function SiteHeader({
  className = '',
  bordered = false,
}: {
  className?: string
  bordered?: boolean
}) {
  return (
    <header
      className={`relative z-10 flex flex-col gap-4 bg-white/70 px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8 ${
        bordered ? 'border-b border-gray-200' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-2 text-2xl font-bold tracking-tight select-none cursor-default">
        <picture>
          <source srcSet="/favicon.ico" media="(prefers-color-scheme: dark)" />
          <img
            src="/logo-black.png"
            alt="TMK logo"
            width={26}
            height={26}
            className="h-6 w-6 object-contain"
          />
        </picture>
        TMK
      </div>
      <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
        <Link href="/" className="tmk-nav-link">Portfolio</Link>
        <Link href="/projects" className="tmk-nav-link tmk-nav-link-featured text-blue-700">Projects</Link>
        <Link href="/about" className="tmk-nav-link">About</Link>
        <Link href="/cybernews" className="tmk-nav-link">Threat Notes</Link>
        <a
          href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 transition hover:border-blue-300 hover:text-blue-700"
        >
          LinkedIn <FiExternalLink aria-hidden="true" />
        </a>
        <Link href="/search" aria-label="Search" className="text-xl hover:opacity-70">
          <FiSearch />
        </Link>
      </nav>
    </header>
  )
}
