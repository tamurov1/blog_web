import type { Metadata } from 'next'
import ConstructionCanvas from './ConstructionCanvas'

export const metadata: Metadata = {
  title: 'Dmytrii Tamurov',
  description:
    'Dmytrii Tamurov cybersecurity portfolio canvas with profile links and SOC Analyst roadmap.',
  alternates: {
    canonical: 'https://dmytriitamurov.com',
  },
}

export default function ConstructionPage() {
  return <ConstructionCanvas />
}
