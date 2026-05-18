'use client'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import BackgroundFX from '@/components/BackgroundFX'
import SiteHeader from '@/components/SiteHeader'
import { blogGraph } from '@/data/blogGraph'
import { cyberNewsPosts } from '@/data/cyberNews'
import { flattenBlogPosts } from '@/utils/flowUtils'

type SearchResult = {
  id: string
  title: string
  href: string
  date?: string
  type: string
  summary?: string
  terms: string
}

const blogResults: SearchResult[] = flattenBlogPosts(blogGraph)
  .filter((post) => post.path)
  .map((post) => ({
    id: `blog:${post.id}`,
    title: post.title,
    href: post.path || '#',
    date: post.date,
    type: post.path?.startsWith('/projects/') ? 'Project' : 'Research post',
    summary: post.author ? `By ${post.author}` : undefined,
    terms: [post.title, post.author, post.date, post.path].filter(Boolean).join(' '),
  }))

const cyberNewsResults: SearchResult[] = cyberNewsPosts.map((post) => ({
  id: `cybernews:${post.id}`,
  title: post.title,
  href: `/cybernews/${post.id}`,
  date: post.publishedAt,
  type: post.category,
  summary: post.deck,
  terms: [
    post.title,
    post.deck,
    post.category,
    post.severity,
    post.publishedAt,
    post.tags.join(' '),
    post.summary.join(' '),
    post.indicators.join(' '),
  ].join(' '),
}))

const allResults = [...cyberNewsResults, ...blogResults]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const mainRef = useRef<HTMLElement | null>(null)
  const trimmedQuery = query.trim().toLowerCase()
  const results = useMemo(() => {
    if (!trimmedQuery) {
      return allResults
    }

    const terms = trimmedQuery.split(/\s+/)
    return allResults.filter((result) => {
      const haystack = `${result.title} ${result.summary || ''} ${result.terms}`.toLowerCase()
      return terms.every((term) => haystack.includes(term))
    })
  }, [trimmedQuery])

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />

      <SiteHeader className="-mx-6 -mt-6 mb-12 animate-fade-up sm:-mx-12 sm:-mt-12" />

      <div className="relative z-10 animate-fade-up-1">
        <h1 className="text-2xl font-bold mb-4">Search</h1>

        <div className="max-w-3xl">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, cybersecurity posts, CVEs, threats..."
            className="w-full rounded-md border border-gray-300 bg-white/80 px-4 py-3 shadow-sm backdrop-blur outline-none focus:border-blue-500"
          />

          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>

            {results.length > 0 ? (
              results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="block rounded-lg border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-700">
                      {result.type}
                    </span>
                    {result.date && <time dateTime={result.date}>{result.date}</time>}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-gray-950">{result.title}</h2>
                  {result.summary && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{result.summary}</p>
                  )}
                </Link>
              ))
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white/80 p-6 text-sm text-gray-600 shadow-sm backdrop-blur">
                No posts matched that search.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
