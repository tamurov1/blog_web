import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import CyberNewsShell from '@/components/CyberNewsShell'
import CyberNewsPostLayout from '@/components/CyberNewsPostLayout'
import {
  CYBERNEWS_AUTHOR_NAME,
  CYBERNEWS_AUTHOR_URL,
  CYBERNEWS_BRAND_NAME,
  CYBERNEWS_SITE_URL,
  cyberNewsPosts,
  getCyberNewsPost,
} from '@/data/cyberNews'

type CyberNewsPostPageProps = {
  params: Promise<{
    postId: string
  }>
}

export function generateStaticParams() {
  return cyberNewsPosts.map((post) => ({
    postId: post.id,
  }))
}

export async function generateMetadata({ params }: CyberNewsPostPageProps): Promise<Metadata> {
  const { postId } = await params
  const post = getCyberNewsPost(postId)

  if (!post) {
    return {
      title: 'Cybernews Post',
    }
  }

  return {
    title: post.title,
    description: post.deck,
    keywords: [
      post.title,
      `${post.category} cybersecurity news`,
      `${post.category} security threats`,
      ...post.tags,
      'cybersecurity news',
      'cyber security news',
      'threat intelligence',
      'security research',
      'incident response',
      'vulnerability analysis',
      CYBERNEWS_BRAND_NAME,
      `${CYBERNEWS_AUTHOR_NAME} cybersecurity`,
      'dmytriitamurov.com cybernews',
    ],
    alternates: {
      canonical: `/cybernews/${post.id}`,
    },
    openGraph: {
      type: 'article',
      url: `/cybernews/${post.id}`,
      title: `${post.title} | ${CYBERNEWS_BRAND_NAME}`,
      description: post.deck,
      siteName: CYBERNEWS_BRAND_NAME,
      publishedTime: post.publishedAt,
      authors: [CYBERNEWS_AUTHOR_NAME],
      tags: post.tags,
      images: [
        {
          url: '/pic-ava.png',
          width: 150,
          height: 150,
          alt: CYBERNEWS_BRAND_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${CYBERNEWS_BRAND_NAME}`,
      description: post.deck,
      images: ['/pic-ava.png'],
    },
  }
}

export default async function CyberNewsPostPage({ params }: CyberNewsPostPageProps) {
  const { postId } = await params
  const post = getCyberNewsPost(postId)

  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.deck,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dmytriitamurov.com/cybernews/${post.id}`,
    },
    author: {
      '@type': 'Person',
      name: CYBERNEWS_AUTHOR_NAME,
      url: CYBERNEWS_AUTHOR_URL,
      knowsAbout: ['Cybersecurity', 'Threat Intelligence', 'SOC Analysis', 'Software Development'],
    },
    publisher: {
      '@type': 'Person',
      name: CYBERNEWS_AUTHOR_NAME,
      url: CYBERNEWS_AUTHOR_URL,
    },
    sourceOrganization: {
      '@type': 'Organization',
      name: CYBERNEWS_BRAND_NAME,
      url: CYBERNEWS_SITE_URL,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Dmytrii Tamurov',
      url: CYBERNEWS_AUTHOR_URL,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.body
      .flatMap((section) => [section.heading, ...section.paragraphs])
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length,
    image: 'https://dmytriitamurov.com/pic-ava.png',
    isBasedOn: post.sourceUrl,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dmytriitamurov.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cybernews',
        item: CYBERNEWS_SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://dmytriitamurov.com/cybernews/${post.id}`,
      },
    ],
  }

  return (
    <CyberNewsShell>
      <Script
        id={`article-schema-${post.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`breadcrumb-schema-${post.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CyberNewsPostLayout post={post} />
    </CyberNewsShell>
  )
}
