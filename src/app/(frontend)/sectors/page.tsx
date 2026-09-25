import type { Metadata } from 'next'

import { PageHead } from '../../../components/sections/PageHead'
import { SectorGrid } from '../../../components/sections/SectorGrid'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { breadcrumbSchema, jsonLd } from '../../../lib/schema'
import { getCmsSectors } from '../../../lib/cms'

const ANSWER =
  'Dainamo Holdings works in five kinds of building: shopping centres, hospitals and healthcare facilities, warehousing and industrial sites, residential complexes, and commercial offices. Each one limits access, working hours, dust, odour and cure times differently, and the programme is written around those limits.'

export const metadata: Metadata = {
  title: 'Sectors we work in',
  description:
    'Specialist flooring, waterproofing, damp proofing and maintenance for Johannesburg shopping centres, hospitals, warehouses, residential complexes and commercial offices.',
  alternates: { canonical: '/sectors' },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Sectors', href: '/sectors' },
]

export const dynamic = 'force-dynamic'

export default async function SectorsPage() {
  const sectors = await getCmsSectors()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />
      <PageHead
        title="The sectors we work in."
        answer={ANSWER}
        crumbs={crumbs}
        media="sector-industrial"
        mediaAlt="Illustrative scene: a warehouse with a grey resin floor and yellow aisle markings"
      />
      <SectorGrid sectors={sectors} showHead={false} />
      <ConversionBand />
    </>
  )
}
