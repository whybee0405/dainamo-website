import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from '@phosphor-icons/react/dist/ssr'

import { Reveal } from '../../../../components/motion/Reveal'
import { PageHead } from '../../../../components/sections/PageHead'
import { Frame } from '../../../../components/media/Frame'
import { Questions } from '../../../../components/sections/Questions'
import { ConversionBand } from '../../../../components/sections/ConversionBand'
import { getCmsCapabilities, getCmsQuestions, getCmsSectors } from '../../../../lib/cms'
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '../../../../lib/schema'

type Params = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const capabilities = await getCmsCapabilities()
  return capabilities.map((capability) => ({ slug: capability.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const capability = (await getCmsCapabilities()).find((item) => item.slug === slug)
  if (!capability) return {}
  return {
    title: `${capability.name} in Johannesburg`,
    description: capability.answer.slice(0, 158),
    alternates: { canonical: `/capabilities/${capability.slug}` },
    openGraph: {
      title: `${capability.name} | Dainamo Holdings`,
      description: capability.answer.slice(0, 200),
    },
  }
}

export default async function CapabilityPage({ params }: Params) {
  const { slug } = await params
  const [capabilities, sectors, questions] = await Promise.all([
    getCmsCapabilities(),
    getCmsSectors(),
    getCmsQuestions(),
  ])
  const capability = capabilities.find((item) => item.slug === slug)
  if (!capability) notFound()

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: capability.name, href: `/capabilities/${capability.slug}` },
  ]

  const relatedSectors = sectors.filter((sector) => sector.capabilities.includes(capability.slug))
  const relatedQuestions = questions.filter(
    (question) =>
      question.answer.toLowerCase().includes(capability.shortName.toLowerCase().split(' ')[0]) ||
      question.question.toLowerCase().includes(capability.shortName.toLowerCase().split(' ')[0]),
  )
  const pageQuestions = relatedQuestions.length >= 3 ? relatedQuestions.slice(0, 5) : questions.slice(0, 5)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema({
            name: capability.name,
            description: capability.answer,
            slug: capability.slug,
            sectors: capability.sectors,
          }),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(pageQuestions))} />

      <PageHead
        eyebrow={capability.buyerQuestion}
        title={capability.name}
        answer={capability.answer}
        crumbs={crumbs}
      >
        <Reveal variant="wipe" className="page-head__media" amount={0.15}>
          <Frame
            media={capability.media}
            alt={`${capability.name} carried out by Dainamo Holdings in Johannesburg`}
            sizes="(min-width: 1100px) 76vw, 100vw"
            ratio={2.3}
            priority
          />
        </Reveal>
      </PageHead>

      <section className="detail section" aria-labelledby="systems-heading">
        <div className="shell detail__grid">
          <div className="detail__aside">
            <h2 id="systems-heading" className="display-3">
              Systems we use
            </h2>
            <p className="detail__note">{capability.lede}</p>
          </div>

          <ul className="detail__systems">
            {capability.systems.map((system) => (
              <li key={system.name}>
                <h3>{system.name}</h3>
                <p>{system.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="detail detail--alt section" aria-labelledby="scope-heading">
        <div className="shell detail__grid">
          <div className="detail__aside">
            <h2 id="scope-heading" className="display-3">
              What a typical scope includes
            </h2>
            <p className="detail__note">
              Every line below appears on the quotation with a quantity and a rate, so there is
              nothing to argue about once the work has started.
            </p>
          </div>

          <ul className="detail__scope">
            {capability.scope.map((item) => (
              <li key={item}>
                <Check size={15} weight="bold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedSectors.length > 0 && (
        <section className="related section" aria-labelledby="related-heading">
          <div className="shell">
            <h2 id="related-heading" className="display-2 related__headline">
              Who asks for this.
            </h2>
            <div className="related__grid">
              {relatedSectors.map((sector) => (
                <Link key={sector.slug} href={`/sectors/${sector.slug}`} className="related__item">
                  <h3>{sector.name}</h3>
                  <p>{sector.lede}</p>
                  <span className="related__cue">
                    <span>Constraints on site</span>
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Questions
        items={pageQuestions}
        heading={`${capability.name}, answered.`}
        showEyebrow={false}
      />

      <ConversionBand />
    </>
  )
}
