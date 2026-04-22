import type { Metadata } from 'next'
import CyberNewsShell from '@/components/CyberNewsShell'

export const metadata: Metadata = {
  title: 'Cybernews',
  description:
    'A cybersecurity news feed with incident briefs, vulnerability movement, defensive priorities, and analyst notes.',
  alternates: {
    canonical: '/cybernews',
  },
}

export default function CyberNewsPage() {
  return <CyberNewsShell />
}
