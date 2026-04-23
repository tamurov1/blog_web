import Link from 'next/link'
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiClock,
  FiLinkedin,
  FiMail,
  FiShare2,
  FiShield,
  FiTwitter,
} from 'react-icons/fi'
import { ADSENSE_CLIENT_ID } from '@/data/adsense'
import { cyberNewsPosts, severityStyles, type NewsPost } from '@/data/cyberNews'
import CyberNewsSaveButton from '@/components/CyberNewsSaveButton'
import CyberNewsViewCounter from '@/components/CyberNewsViewCounter'

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

export default function CyberNewsPostLayout({ post }: { post: NewsPost }) {
  const canonicalPath = `/cybernews/${post.id}`
  const shareUrl = `https://dmytriitamurov.com${canonicalPath}`
  const relatedPosts = post.relatedIds
    .map((postId) => cyberNewsPosts.find((candidate) => candidate.id === postId))
    .filter((candidate): candidate is NewsPost => Boolean(candidate))

  return (
    <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 px-4 pb-[50px] sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
      <article className="rounded-lg border border-black/5 bg-white/85 p-5 shadow-lg backdrop-blur sm:p-7">
        <Link
          href="/cybernews"
          className="mb-6 inline-flex h-10 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
        >
          <FiArrowLeft aria-hidden="true" />
          Feed
        </Link>

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

        <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">{post.deck}</p>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          <CyberNewsViewCounter postId={post.id} />
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 hover:underline"
          >
            Source: {post.source}
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <CyberNewsSaveButton postId={post.id} />
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-800 hover:bg-gray-50"
          >
            <FiTwitter aria-hidden="true" />
            X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-800 hover:bg-gray-50"
          >
            <FiLinkedin aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-800 hover:bg-gray-50"
          >
            <FiShare2 aria-hidden="true" />
            Email
          </a>
        </div>

        <section className="mt-8 space-y-8 text-base leading-7 text-gray-700">
          {post.body.map((section, index) => (
            <div key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-950">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-gray-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {index === 0 && (
                <AdSlot
                  slot="CYBERNEWS_ARTICLE_INLINE_1"
                  className="my-8 min-h-[90px]"
                />
              )}
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-md border border-red-100 bg-red-50 p-4">
          <h2 className="text-xl font-semibold text-red-950">Why it matters</h2>
          <p className="mt-3 text-base leading-7 text-red-950/80">{post.whyItMatters}</p>
        </section>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-950">
            <FiShield className="text-blue-600" aria-hidden="true" />
            Post Brief
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-gray-700">
            {post.summary.map((item) => (
              <li key={item} className="rounded-md bg-gray-50 p-4">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-950">
            <FiAlertTriangle className="text-orange-500" aria-hidden="true" />
            Timeline
          </h2>
          <ol className="mt-4 space-y-3 text-base leading-7 text-gray-700">
            {post.timeline.map((item) => (
              <li key={item} className="border-l-2 border-blue-200 pl-4">
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-md border border-blue-100 bg-blue-50 p-4">
          <h2 className="text-xl font-semibold text-blue-950">Analyst note</h2>
          <p className="mt-3 text-base leading-7 text-blue-950/80">{post.analystNote}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-950">Watch indicators</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.indicators.map((indicator) => (
              <span key={indicator} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
                {indicator}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-md border border-gray-200 bg-gray-50 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-950">Security briefings by email</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Get new cybernews posts, incident notes, and practical defense checklists.
              </p>
            </div>
            <form className="flex w-full gap-2 sm:max-w-sm">
              <label className="sr-only" htmlFor="cybernews-email">Email</label>
              <input
                id="cybernews-email"
                type="email"
                placeholder="email@example.com"
                className="h-10 min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-black px-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                <FiMail aria-hidden="true" />
                Sign up
              </button>
            </form>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-950">Related articles</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/cybernews/${relatedPost.id}`}
                  className="rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className={`rounded-md border px-2 py-1 text-[11px] font-bold ${severityStyles(relatedPost.severity)}`}>
                    {relatedPost.severity}
                  </span>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-gray-950">{relatedPost.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{relatedPost.deck}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
        <AdSlot slot="CYBERNEWS_ARTICLE_SIDEBAR_1" className="hidden min-h-[600px] lg:block" />
        <AdSlot slot="CYBERNEWS_ARTICLE_MOBILE_1" className="block min-h-[100px] lg:hidden" />
        <div className="rounded-lg border border-black/5 bg-white/80 p-4 shadow-lg backdrop-blur">
          <h2 className="text-sm font-semibold text-gray-950">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
