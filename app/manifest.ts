import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dmytrii Tamurov',
    short_name: 'Dmytrii Tamurov',
    description: 'Dmytrii Tamurov.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f2f1dc',
    theme_color: '#f2f1dc',
  }
}
