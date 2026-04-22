'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  FiBookmark,
  FiCoffee,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiFilter,
  FiRss,
  FiSearch,
  FiZap,
} from 'react-icons/fi'
import {
  CYBER_NEWS_PAGE_SIZE,
  cyberNewsCategories,
  cyberNewsPosts,
  cyberNewsSeverities,
  severityStyles,
  type NewsSeverity,
} from '@/data/cyberNews'
import { ADSENSE_CLIENT_ID } from '@/data/adsense'
import CyberNewsSaveButton from '@/components/CyberNewsSaveButton'

function AdSlot({
  slot,
  className = '',
}: {
  slot: string
  className?: string
}) {
  return (
    <aside
      className={`overflow-hidden rounded-md bg-white ${className}`}
      aria-hidden="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}

export default function CyberNewsFeed() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [severity, setSeverity] = useState<'All' | NewsSeverity>('All')
  const [page, setPage] = useState(1)

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return cyberNewsPosts.filter((post) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [post.title, post.deck, post.category, post.source, ...post.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      const matchesCategory = category === 'All' || post.category === category
      const matchesSeverity = severity === 'All' || post.severity === severity

      return matchesQuery && matchesCategory && matchesSeverity
    })
  }, [category, query, severity])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / CYBER_NEWS_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * CYBER_NEWS_PAGE_SIZE
  const visiblePosts = filteredPosts.slice(pageStart, pageStart + CYBER_NEWS_PAGE_SIZE)
  const leadPost = filteredPosts[0] || cyberNewsPosts[0]

  const updateFilter = (callback: () => void) => {
    callback()
    setPage(1)
  }

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 sm:px-6 lg:px-8">
      <section className="grid gap-4 rounded-lg border border-black/5 bg-white/75 p-4 shadow-lg backdrop-blur sm:p-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            <FiRss className="text-base text-blue-600" aria-hidden="true" />
            Cyber Security News Feed
          </div>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Cybernews
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
            A structured feed for security incidents, vulnerability movement, defensive priorities,
            and operational notes.
          </p>
        </div>

        <Link
          href="/cybernews/saved"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-black px-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
        >
          <FiBookmark aria-hidden="true" />
          Watch feed
        </Link>
      </section>

      <AdSlot slot="CYBERNEWS_FEED_LEADERBOARD_1" className="hidden min-h-[90px] lg:block" />
      <AdSlot slot="CYBERNEWS_FEED_MOBILE_1" className="block min-h-[100px] lg:hidden" />

      <section className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)_280px]">
        <div className="space-y-4 lg:sticky lg:top-4">
          <div className="rounded-lg border border-black/5 bg-white/75 p-4 shadow-lg backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FiFilter className="text-blue-600" aria-hidden="true" />
              Feed controls
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
              Search
              <span className="mt-2 flex h-10 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm normal-case tracking-normal text-gray-700">
                <FiSearch className="text-gray-400" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => updateFilter(() => setQuery(event.target.value))}
                  placeholder="Threats, tags, categories"
                  className="w-full bg-transparent outline-none placeholder:text-gray-400"
                />
              </span>
            </label>

            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Category</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {cyberNewsCategories.map((item) => (
                  <button
                    key={item}
                    onClick={() => updateFilter(() => setCategory(item))}
                    className={`h-9 rounded-md border px-3 text-xs font-medium transition ${
                      category === item
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Severity</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {cyberNewsSeverities.map((item) => (
                  <button
                    key={item}
                    onClick={() => updateFilter(() => setSeverity(item))}
                    className={`h-9 rounded-md border px-3 text-xs font-medium transition ${
                      severity === item
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AdSlot slot="CYBERNEWS_FEED_SPONSORED_1" className="min-h-[250px]" />
        </div>

        <div className="space-y-4">
          <article className="rounded-lg border border-black/5 bg-white/80 p-4 shadow-lg backdrop-blur sm:p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
              <FiZap className="text-blue-600" aria-hidden="true" />
              Lead story
            </div>
            <Link href={`/cybernews/${leadPost.id}`} className="block">
              <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                {leadPost.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{leadPost.deck}</p>
            </Link>
          </article>

          <div className="rounded-lg border border-black/5 bg-white/75 p-3 text-sm text-gray-600 shadow-sm backdrop-blur">
            Showing {visiblePosts.length} of {filteredPosts.length} posts. Page {currentPage} of {totalPages}.
          </div>

          <div className="grid auto-rows-auto gap-3">
            {visiblePosts.map((post, index) => (
              <div key={post.id}>
                {index === 2 && <AdSlot slot="CYBERNEWS_FEED_INLINE_1" className="mb-3 min-h-[90px]" />}
                <article className="rounded-lg border border-black/5 bg-white/75 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-md border px-2 py-1 text-[11px] font-bold ${severityStyles(post.severity)}`}>
                      {post.severity}
                    </span>
                    <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-600">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <FiClock aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                  <Link href={`/cybernews/${post.id}`} className="mt-3 block">
                    <h3 className="text-lg font-semibold leading-snug text-gray-950">{post.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{post.deck}</p>
                  </Link>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CyberNewsSaveButton postId={post.id} compact />
                  </div>
                </article>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="rounded-lg border border-black/5 bg-white/75 p-6 text-center text-sm text-gray-600 shadow-sm backdrop-blur">
              No posts match the current filters.
            </div>
          )}

          <nav className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/5 bg-white/75 p-3 shadow-sm backdrop-blur">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronLeft aria-hidden="true" />
              Previous
            </button>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 min-w-9 rounded-md border px-3 text-sm font-medium ${
                      pageNumber === currentPage
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <FiChevronRight aria-hidden="true" />
            </button>
          </nav>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4">
          <div className="rounded-lg border border-black/5 bg-white/80 p-4 shadow-lg backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-950">
              <FiCoffee className="text-red-500" aria-hidden="true" />
              Give for a cup of coffee
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Support independent cybersecurity notes, research time, and better threat writeups.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
            >
              Buy a coffee
            </a>
          </div>
          <AdSlot slot="CYBERNEWS_FEED_SIDEBAR_1" className="hidden min-h-[600px] lg:block" />
        </aside>
      </section>
    </div>
  )
}
