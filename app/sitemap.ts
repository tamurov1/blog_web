import type { MetadataRoute } from 'next'
import { listJournals } from '@/lib/journalStore'

const siteUrl = 'https://dmytriitamurov.com'
const lastModified = new Date('2026-07-02T00:00:00-04:00')

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let journals: Awaited<ReturnType<typeof listJournals>> = []

  try {
    journals = await listJournals()
  } catch {
    journals = []
  }

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/journal`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...journals.map((journal) => ({
      url: `${siteUrl}/journal/${journal.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${siteUrl}/cybersecurity`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/library`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
