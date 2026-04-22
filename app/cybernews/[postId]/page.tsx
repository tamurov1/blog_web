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
    '@type': 'Article',
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
    image: 'https://dmytriitamurov.com/pic-ava.png',
    isBasedOn: post.sourceUrl,
  }

  return (
    <CyberNewsShell>
      <Script
        id={`article-schema-${post.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CyberNewsPostLayout post={post} />
    </CyberNewsShell>
  )
}
