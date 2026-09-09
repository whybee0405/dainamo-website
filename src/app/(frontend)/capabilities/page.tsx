import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { Reveal } from '../../../components/motion/Reveal'
import { PageHead } from '../../../components/sections/PageHead'
import { Frame } from '../../../components/media/Frame'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { capabilities as fallbackCapabilities, supportingTrades } from '../../../content/capabilities'
import { getCmsCapabilities } from '../../../lib/cms'
import { breadcrumbSchema, jsonLd } from '../../../lib/schema'

const ANSWER =
  'Dainamo Holdings provides epoxy and resin flooring, waterproofing, damp proofing, protective and industrial coatings, thermoplastic line marking and planned building maintenance across Johannesburg and Gauteng, together with the plumbing, electrical, solar, HVAC and interior trades needed to complete a contract.'

export const metadata: Metadata = {
  title: 'Capabilities',
  description: ANSWER.slice(0, 158),
  alternates: { canonical: '/capabilities' },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Capabilities', href: '/capabilities' },
]

export const dynamic = 'force-dynamic'

export default async function CapabilitiesPage() {
  const capabilities = await getCmsCapabilities()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHead
        title="What we are specified for."
        answer={ANSWER}
        crumbs={crumbs}
      />

      <section className="capability-index section" aria-label="Specialist systems">
        <div className="shell">
          <div className="capability-index__grid">
            {capabilities.map((capability, index) => (
              <Reveal
                key={capability.slug}
                variant="rise"
                delay={Math.min(index, 2) * 0.07}
                amount={0.2}
                className="capability-index__item"
              >
                <Link href={`/capabilities/${capability.slug}`} data-cursor="media">
                  <Frame
                    media={capability.media}
                    alt={`${capability.name} by Dainamo Holdings`}
                    sizes="(min-width: 900px) 32vw, 100vw"
                    ratio={1.5}
                  />
                  <h2>{capability.name}</h2>
                  <p>{capability.lede}</p>
                  <span className="capability-index__cue">
                    <span>What is included</span>
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="trades section" aria-labelledby="trades-heading">
        <div className="shell">
          <h2 id="trades-heading" className="display-2 trades__headline">
            The trades that finish the job.
          </h2>
          <p className="lede trades__lede">
            Specialist systems rarely arrive on a site alone. A roof repair uncovers a gutter, a
            floor needs a drain moved, a refurbishment needs a ceiling closed up. These sit inside
            the same contract rather than becoming somebody else's problem.
          </p>

          <div className="trades__grid">
            {supportingTrades.map((trade) => (
              <div key={trade.name} className="trades__item">
                <h3>{trade.name}</h3>
                <p>{trade.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConversionBand />
    </>
  )
}
