import type { MetadataRoute } from 'next'

const siteUrl = 'https://dmytriitamurov.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-06-08T00:00:00-04:00'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
