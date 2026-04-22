import type { Metadata } from 'next'
import Script from 'next/script'
import CyberNewsShell from '@/components/CyberNewsShell'
import CyberNewsFeed from '@/components/CyberNewsFeed'
import { cyberNewsPosts } from '@/data/cyberNews'

export const metadata: Metadata = {
  title: 'Cybersecurity News, Vulnerability Reports, Threat Intelligence and Incident Briefs',
  description:
    'Cybernews by Dmytrii Tamurov: cybersecurity news, vulnerability reports, ransomware updates, cloud security threats, supply-chain risk, incident response notes, and practical defense analysis.',
  keywords: [
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
    title: 'Cybersecurity News and Threat Intelligence | Dmytrii Tamurov',
    description:
      'A structured cybersecurity news feed with vulnerability reports, ransomware updates, cloud security threats, incident response notes, and analyst context.',
    siteName: 'Dmytrii Tamurov',
    images: [
      {
        url: '/pic-ava.png',
        width: 150,
        height: 150,
        alt: 'Dmytrii Tamurov cybersecurity news',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity News and Threat Intelligence',
    description:
      'Cybersecurity news, vulnerabilities, ransomware updates, cloud threats, and practical defense analysis.',
    images: ['/pic-ava.png'],
  },
}

export default function CyberNewsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Cybersecurity News and Threat Intelligence',
    description: metadata.description,
    url: 'https://dmytriitamurov.com/cybernews',
    publisher: {
      '@type': 'Person',
      name: 'Dmytrii Tamurov',
      url: 'https://dmytriitamurov.com',
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
