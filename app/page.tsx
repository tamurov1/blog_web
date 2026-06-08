import type { Metadata } from 'next'
import ConstructionCanvas from './construction/ConstructionCanvas'

export const metadata: Metadata = {
  title: 'Dmytrii Tamurov Portfolio',
  description:
    'Official portfolio of Dmytrii Tamurov, focused on cybersecurity, SOC analyst skills, threat detection, secure development, and Nexessary.',
  alternates: {
    canonical: 'https://dmytriitamurov.com',
  },
  openGraph: {
    url: 'https://dmytriitamurov.com',
    title: 'Dmytrii Tamurov Portfolio',
    description:
      'Official cybersecurity portfolio for SOC analyst work, threat detection, secure development, and Nexessary.',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://dmytriitamurov.com/#person',
      name: 'Dmytrii Tamurov',
      url: 'https://dmytriitamurov.com',
      image: 'https://dmytriitamurov.com/pic-ava.png',
      sameAs: [
        'https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274',
        'https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA',
        'https://nexessary.com',
      ],
      knowsAbout: [
        'Cybersecurity',
        'SOC analysis',
        'Threat detection',
        'Incident response',
        'Linux security automation',
        'Vulnerability research',
        'Secure development',
      ],
      description:
        'Dmytrii Tamurov is building a cybersecurity portfolio focused on SOC analysis, threat detection, Linux security automation, vulnerability research, secure development, and Nexessary.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dmytriitamurov.com/#website',
      name: 'Dmytrii Tamurov Portfolio',
      url: 'https://dmytriitamurov.com',
      publisher: {
        '@id': 'https://dmytriitamurov.com/#person',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://nexessary.com/#software',
      name: 'Nexessary',
      url: 'https://nexessary.com',
      applicationCategory: 'ProductivityApplication',
      creator: {
        '@id': 'https://dmytriitamurov.com/#person',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ConstructionCanvas />
    </>
  )
}
