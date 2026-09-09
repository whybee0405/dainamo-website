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
import { getCmsCapabilities, getCmsQuestions, getCmsSectors } from '../../lib/cms'
import { faqSchema, jsonLd } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Epoxy flooring, waterproofing and damp proofing in Johannesburg',
  description:
    'Dainamo Holdings is a Johannesburg specialist contractor for epoxy and resin flooring, torch-on waterproofing, damp proofing, protective coatings and planned maintenance in shopping centres, hospitals, warehouses, offices and residential complexes.',
  alternates: { canonical: '/' },
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [capabilities, sectors, questions] = await Promise.all([
    getCmsCapabilities(),
    getCmsSectors(),
    getCmsQuestions(),
  ])
  const pageQuestions = questions.filter((question) => question.onHome)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(pageQuestions.length ? pageQuestions : homeQuestions))} />
      <Hero />
      <ClientStrip />
      <Position />
      <CapabilityStack capabilities={capabilities} />
      <SectorGrid sectors={sectors} />
      <Method />
      <CaseStudy showComparison={false} />
      <Questions items={pageQuestions.length ? pageQuestions : homeQuestions} />
      <ConversionBand />
    </>
  )
}
