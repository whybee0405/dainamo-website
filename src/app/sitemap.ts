import type { MetadataRoute } from 'next'

import { SITE_URL } from '../lib/site'
import { capabilities } from '../content/capabilities'
import { sectors } from '../content/sectors'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/capabilities`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/sectors`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/work`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/company`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${SITE_URL}/questions`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/site-assessment`, priority: 0.95, changeFrequency: 'yearly' },
    { url: `${SITE_URL}/privacy`, priority: 0.2, changeFrequency: 'yearly' },
  ]

  const dynamic: MetadataRoute.Sitemap = [
    ...capabilities.map((item) => ({
      url: `${SITE_URL}/capabilities/${item.slug}`,
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    })),
    ...sectors.map((item) => ({
      url: `${SITE_URL}/sectors/${item.slug}`,
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    })),
  ]

  return [...fixed, ...dynamic].map((entry) => ({ ...entry, lastModified: now }))
}
