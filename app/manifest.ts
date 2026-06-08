import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dmytrii Tamurov Portfolio',
    short_name: 'Dmytrii Tamurov',
    description:
      'Cybersecurity portfolio for Dmytrii Tamurov, focused on SOC analysis, threat detection, secure development, and Nexessary.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/pic-ava.png',
        sizes: '360x360',
        type: 'image/png',
      },
    ],
  }
}
