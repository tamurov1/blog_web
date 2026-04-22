import type { Metadata } from 'next'
import CyberNewsShell from '@/components/CyberNewsShell'
import SavedCyberNewsList from '@/components/SavedCyberNewsList'

export const metadata: Metadata = {
  title: 'Saved Cybernews',
  description: 'Saved cybersecurity news posts from the TMK cybernews feed.',
  alternates: {
    canonical: '/cybernews/saved',
  },
}

export default function SavedCyberNewsPage() {
  return (
    <CyberNewsShell>
      <SavedCyberNewsList />
    </CyberNewsShell>
  )
}
