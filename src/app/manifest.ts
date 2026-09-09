import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dainamo Holdings',
    short_name: 'Dainamo',
    description:
      'Specialist epoxy flooring, waterproofing, damp proofing and maintenance contracts in Johannesburg.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1b5cd0',
    lang: 'en-ZA',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/brand/dainamo-icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
