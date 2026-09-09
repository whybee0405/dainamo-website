import type { Metadata } from 'next'

import { PageHead } from '../../../components/sections/PageHead'
import { Questions } from '../../../components/sections/Questions'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { questions as fallbackQuestions } from '../../../content/questions'
import { getCmsQuestions } from '../../../lib/cms'
import { breadcrumbSchema, faqSchema, jsonLd } from '../../../lib/schema'

const ANSWER =
  'Common questions about Dainamo Holdings, covering service areas across Johannesburg and Gauteng, epoxy floor cure times, working in occupied buildings, diagnosing damp, what a quotation includes, payment terms and maintenance contracts.'

export const metadata: Metadata = {
  title: 'Common questions',
  description:
    'Answers on service areas, epoxy cure times, working in occupied buildings, diagnosing damp, quotations, payment terms and maintenance contracts from Dainamo Holdings, Johannesburg.',
  alternates: { canonical: '/questions' },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Common questions', href: '/questions' },
]

const GROUPS = [
  { topic: 'general', title: 'About the company' },
  { topic: 'technical', title: 'Coatings, waterproofing and damp' },
  { topic: 'site', title: 'On site' },
  { topic: 'commercial', title: 'Quoting and payment' },
  { topic: 'contracts', title: 'Maintenance contracts' },
] as const

export const dynamic = 'force-dynamic'

export default async function QuestionsPage() {
  const questions = await getCmsQuestions()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(questions))} />

      <PageHead title="Everything worth asking first." answer={ANSWER} crumbs={crumbs} />

      {GROUPS.map((group) => {
        const items = questions.filter((question) => question.topic === group.topic)
        if (items.length === 0) return null
        return (
          <Questions
            key={group.topic}
            items={items}
            heading={group.title}
            showEyebrow={false}
            showAll={false}
            compact
          />
        )
      })}

      <ConversionBand />
    </>
  )
}
