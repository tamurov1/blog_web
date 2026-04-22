import type { Metadata } from 'next'
import Script from 'next/script'
import CyberNewsShell from '@/components/CyberNewsShell'
import CyberNewsFeed from '@/components/CyberNewsFeed'
import {
  CYBERNEWS_AUTHOR_NAME,
  CYBERNEWS_AUTHOR_URL,
  CYBERNEWS_BRAND_NAME,
  CYBERNEWS_SITE_URL,
  cyberNewsPosts,
} from '@/data/cyberNews'

export const metadata: Metadata = {
  title: 'Dmytrii Tamurov Cybernews - Cybersecurity News, Vulnerability Reports and Threat Intelligence',
  description:
    'Dmytrii Tamurov Cybernews on dmytriitamurov.com covers cybersecurity news, vulnerability reports, ransomware updates, cloud security threats, supply-chain risk, incident response notes, and practical defense analysis.',
  authors: [{ name: CYBERNEWS_AUTHOR_NAME, url: CYBERNEWS_AUTHOR_URL }],
  creator: CYBERNEWS_AUTHOR_NAME,
  publisher: CYBERNEWS_AUTHOR_NAME,
  keywords: [
    'Dmytrii Tamurov Cybernews',
    'Dmytrii Tamurov cybersecurity news',
    'dmytriitamurov.com cybernews',
    'TMK cybernews',
    'cybersecurity news',
    'cyber security news',
    'latest cybersecurity threats',
    'vulnerability news',
    'ransomware news',
    'cloud security news',
    'threat intelligence',
    'incident response',
    'security research',
    'cybernews',
    'Dmytrii Tamurov cybersecurity',
    'SOC analyst news',
    'application security news',
    'supply chain security',
  ],
  alternates: {
    canonical: '/cybernews',
  },
  openGraph: {
    type: 'website',
    url: '/cybernews',
    title: 'Dmytrii Tamurov Cybernews | Cybersecurity News and Threat Intelligence',
    description:
      'Cybersecurity news and threat intelligence by Dmytrii Tamurov on dmytriitamurov.com.',
    siteName: CYBERNEWS_BRAND_NAME,
    images: [
      {
        url: '/pic-ava.png',
        width: 150,
        height: 150,
        alt: 'Dmytrii Tamurov Cybernews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dmytrii Tamurov Cybernews',
    description:
      'Cybersecurity news, vulnerabilities, ransomware updates, cloud threats, and practical defense analysis by Dmytrii Tamurov.',
    images: ['/pic-ava.png'],
  },
}

export default function CyberNewsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: CYBERNEWS_BRAND_NAME,
    alternateName: [
      'Cybernews by Dmytrii Tamurov',
      'TMK Cybernews',
      'Dmytrii Tamurov Cybersecurity News',
    ],
    description: metadata.description,
    url: CYBERNEWS_SITE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Dmytrii Tamurov',
      url: CYBERNEWS_AUTHOR_URL,
    },
    creator: {
      '@type': 'Person',
      name: CYBERNEWS_AUTHOR_NAME,
      url: CYBERNEWS_AUTHOR_URL,
      knowsAbout: ['Cybersecurity', 'Threat Intelligence', 'SOC Analysis', 'Software Development'],
    },
    author: {
      '@type': 'Person',
      name: CYBERNEWS_AUTHOR_NAME,
      url: CYBERNEWS_AUTHOR_URL,
    },
    publisher: {
      '@type': 'Person',
      name: CYBERNEWS_AUTHOR_NAME,
      url: CYBERNEWS_AUTHOR_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: cyberNewsPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://dmytriitamurov.com/cybernews/${post.id}`,
        name: post.title,
        description: post.deck,
      })),
    },
  }

  return (
    <CyberNewsShell>
      <Script
        id="cybernews-feed-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <CyberNewsFeed />
    </CyberNewsShell>
  )
}
