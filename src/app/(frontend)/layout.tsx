import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import './globals.css'
import './cursor.css'
import './chrome.css'
import './sections.css'
import './pages.css'

import { fontVariables } from '../../lib/fonts'
import { company, SITE_URL } from '../../lib/site'
import { getCmsCompany } from '../../lib/cms'
import { organisationGraph } from '../../lib/schema'
import { Cursor } from '../../components/chrome/Cursor'
import { SmoothScroll } from '../../components/chrome/SmoothScroll'
import { SiteHeader } from '../../components/chrome/SiteHeader'
import { SiteFooter } from '../../components/chrome/SiteFooter'
import { WhatsAppButton } from '../../components/chrome/WhatsAppButton'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dainamo Holdings | Epoxy flooring, waterproofing and damp proofing in Johannesburg',
    template: '%s | Dainamo Holdings',
  },
  description:
    'Dainamo Holdings is a Johannesburg specialist contractor for epoxy and resin flooring, torch-on waterproofing, damp proofing, protective coatings and planned building maintenance across shopping centres, hospitals, warehouses, offices and residential complexes in Gauteng.',
  applicationName: 'Dainamo Holdings',
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  category: 'Construction',
  keywords: [
    'epoxy flooring Johannesburg',
    'waterproofing contractor Gauteng',
    'damp proofing Johannesburg',
    'torch-on waterproofing',
    'industrial floor coatings',
    'building maintenance contracts Johannesburg',
    'hospital epoxy flooring South Africa',
    'warehouse floor coating',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: SITE_URL,
    siteName: 'Dainamo Holdings',
    title: 'Specialist finishes for buildings that cannot close',
    description:
      'Epoxy and resin flooring, waterproofing, damp proofing and planned maintenance for Johannesburg shopping centres, hospitals, warehouses and complexes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Specialist finishes for buildings that cannot close',
    description:
      'Epoxy and resin flooring, waterproofing, damp proofing and planned maintenance across Johannesburg and Gauteng.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [{ url: '/brand/dainamo-icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const dynamic = 'force-dynamic'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const cmsCompany = await getCmsCompany()

  return (
    <html lang="en-ZA" className={fontVariables}>
      <body>
        <Script
          id="dainamo-organisation"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationGraph()) }}
        />
        {/* Scroll reveals are inline styles written by the motion runtime. If
            scripting is unavailable the content must still be readable. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"],.reveal-wipe__inner{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <div id="scroll-sentinel" aria-hidden="true" />
        <SiteHeader company={cmsCompany} />
        <main id="main">{children}</main>
        <SiteFooter company={cmsCompany} />
        <WhatsAppButton />
      </body>
    </html>
  )
}
