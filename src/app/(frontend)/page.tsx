import type { Metadata } from 'next'

import { Hero } from '../../components/sections/Hero'
import { ClientStrip } from '../../components/sections/ClientStrip'
import { Services } from '../../components/sections/Services'
import { SiteReel } from '../../components/sections/SiteReel'
import { BeforeAfter } from '../../components/sections/BeforeAfter'
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
  const faq = pageQuestions.length ? pageQuestions : homeQuestions

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faq))} />
      <Hero />
      <ClientStrip />
      <Services capabilities={capabilities} />
      <SiteReel />
      <BeforeAfter />
      <SectorGrid sectors={sectors} />
      <Method />
      <CaseStudy />
      <Questions items={faq} />
      <ConversionBand />
    </>
  )
}
