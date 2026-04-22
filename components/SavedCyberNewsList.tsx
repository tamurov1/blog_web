'use client'

import Link from 'next/link'
import { FiArrowLeft, FiBookmark, FiTrash2 } from 'react-icons/fi'
import { cyberNewsPosts, severityStyles } from '@/data/cyberNews'
import { useSavedCyberNews } from '@/components/useSavedCyberNews'

export default function SavedCyberNewsList() {
  const { savedPostIds, removePost } = useSavedCyberNews()
  const savedPosts = savedPostIds
    .map((postId) => cyberNewsPosts.find((post) => post.id === postId))
    .filter((post): post is (typeof cyberNewsPosts)[number] => Boolean(post))

  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-black/5 bg-white/80 p-5 shadow-lg backdrop-blur sm:p-7">
        <Link
          href="/cybernews"
          className="mb-6 inline-flex h-10 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
        >
          <FiArrowLeft aria-hidden="true" />
          Feed
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          <FiBookmark className="text-base text-red-600" aria-hidden="true" />
          Watch feed
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">Saved Cybernews</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
          Posts saved in this browser appear here. This is intentionally lightweight until the site
          has user accounts.
        </p>
      </section>

      <div className="mt-6 grid gap-3">
        {savedPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-lg border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-md border px-2 py-1 text-[11px] font-bold ${severityStyles(post.severity)}`}>
                {post.severity}
              </span>
              <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-600">
                {post.category}
              </span>
              <time className="text-xs text-gray-500" dateTime={post.publishedAt}>
                {post.publishedAt}
              </time>
            </div>
            <Link href={`/cybernews/${post.id}`} className="mt-3 block">
              <h2 className="text-xl font-semibold leading-snug text-gray-950">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{post.deck}</p>
            </Link>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => removePost(post.id)}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 text-xs font-medium text-red-700 hover:bg-red-100"
              >
                <FiTrash2 aria-hidden="true" />
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      {savedPosts.length === 0 && (
        <div className="mt-6 rounded-lg border border-black/5 bg-white/80 p-6 text-center text-sm text-gray-600 shadow-sm backdrop-blur">
          No saved posts yet.
        </div>
      )}
    </div>
  )
}
