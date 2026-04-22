import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import CyberNewsShell from '@/components/CyberNewsShell'
import CyberNewsPostLayout from '@/components/CyberNewsPostLayout'
import { cyberNewsPosts, getCyberNewsPost } from '@/data/cyberNews'

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
      'Dmytrii Tamurov',
    ],
    alternates: {
      canonical: `/cybernews/${post.id}`,
    },
    openGraph: {
      type: 'article',
      url: `/cybernews/${post.id}`,
      title: post.title,
      description: post.deck,
      siteName: 'Dmytrii Tamurov',
      publishedTime: post.publishedAt,
      authors: ['Dmytrii Tamurov'],
      tags: post.tags,
      images: [
        {
          url: '/pic-ava.png',
          width: 150,
          height: 150,
          alt: 'Dmytrii Tamurov',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
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
      name: 'Dmytrii Tamurov',
      url: 'https://dmytriitamurov.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Dmytrii Tamurov',
      url: 'https://dmytriitamurov.com',
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
        item: 'https://dmytriitamurov.com/cybernews',
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
