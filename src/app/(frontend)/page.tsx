import type { Metadata } from 'next'

import { Hero } from '../../components/sections/Hero'
import { ClientStrip } from '../../components/sections/ClientStrip'
import { Position } from '../../components/sections/Position'
import { CapabilityStack } from '../../components/sections/CapabilityStack'
import { SectorGrid } from '../../components/sections/SectorGrid'
import { Method } from '../../components/sections/Method'
import { CaseStudy } from '../../components/sections/CaseStudy'
import { Questions } from '../../components/sections/Questions'
import { ConversionBand } from '../../components/sections/ConversionBand'
import { homeQuestions } from '../../content/questions'
import { faqSchema, jsonLd } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Epoxy flooring, waterproofing and damp proofing in Johannesburg',
  description:
    'Dainamo Holdings is a Johannesburg specialist contractor for epoxy and resin flooring, torch-on waterproofing, damp proofing, protective coatings and planned maintenance in shopping centres, hospitals, warehouses, offices and residential complexes.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(homeQuestions))} />
      <Hero />
      <ClientStrip />
      <Position />
      <CapabilityStack />
      <SectorGrid />
      <Method />
      <CaseStudy showComparison={false} />
      <Questions items={homeQuestions} />
      <ConversionBand />
    </>
  )
}
