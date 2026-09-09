import type { MetadataRoute } from 'next'

import { SITE_URL } from '../lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Answer engines and assistant crawlers are welcome: being quotable is
        // the point of the way this site is written.
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
