import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { PageHead } from '../../../../components/sections/PageHead'
import { ConversionBand } from '../../../../components/sections/ConversionBand'
import { Questions } from '../../../../components/sections/Questions'
import { getCmsCapabilities, getCmsQuestions, getCmsSectors } from '../../../../lib/cms'
import { breadcrumbSchema, faqSchema, jsonLd } from '../../../../lib/schema'

type Params = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const sectors = await getCmsSectors()
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const sector = (await getCmsSectors()).find((item) => item.slug === slug)
  if (!sector) return {}
  return {
    title: `${sector.name} in Johannesburg`,
    description: sector.answer.slice(0, 158),
    alternates: { canonical: `/sectors/${sector.slug}` },
  }
}

export default async function SectorPage({ params }: Params) {
  const { slug } = await params
  const [sectors, capabilities, questions] = await Promise.all([
    getCmsSectors(),
    getCmsCapabilities(),
    getCmsQuestions(),
  ])
  const sector = sectors.find((item) => item.slug === slug)
  if (!sector) notFound()

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Sectors', href: '/sectors' },
    { name: sector.name, href: `/sectors/${sector.slug}` },
  ]

  const related = capabilities.filter((capability) => sector.capabilities.includes(capability.slug))
  const pageQuestions = questions.filter((q) => q.topic === 'site' || q.topic === 'general').slice(0, 5)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(pageQuestions))} />

      <PageHead title={sector.name} answer={sector.answer} crumbs={crumbs} media={sector.media} mediaAlt={`Illustrative scene: ${sector.name.toLowerCase()}`} />

      <section className="pressures section" aria-labelledby="pressures-heading">
        <div className="shell pressures__grid">
          <div className="pressures__aside">
            <h2 id="pressures-heading" className="display-2">
              What makes this difficult.
            </h2>
            <p className="detail__note">{sector.lede}</p>
          </div>

          <ul className="pressures__list">
            {sector.pressures.map((pressure) => (
              <li key={pressure.title}>
                <div>
                  <h3>{pressure.title}</h3>
                  <p>{pressure.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="related section" aria-labelledby="sector-services-heading">
        <div className="shell">
          <h2 id="sector-services-heading" className="display-2 related__headline">
            What we are usually asked for here.
          </h2>
          <div className="related__grid">
            {related.map((capability) => (
              <Link
                key={capability.slug}
                href={`/capabilities/${capability.slug}`}
                className="related__item"
              >
                <h3>{capability.name}</h3>
                <p>{capability.lede}</p>
                <span className="related__cue">
                  <span>How we scope it</span>
                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Questions items={pageQuestions} heading="Working on an occupied site." showEyebrow={false} />

      <ConversionBand />
    </>
  )
}
