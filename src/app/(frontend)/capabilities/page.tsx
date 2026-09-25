import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

import { Reveal } from '../../../components/motion/Reveal'
import { PageHead } from '../../../components/sections/PageHead'
import { Frame, describePhoto } from '../../../components/media/Frame'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { capabilities as fallbackCapabilities, supportingTrades } from '../../../content/capabilities'
import { getCmsCapabilities } from '../../../lib/cms'
import { breadcrumbSchema, jsonLd } from '../../../lib/schema'
import { capabilityCover } from '../../../content/photos'

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
        media="epoxy-corridor"
        mediaAlt="A finished light grey gloss epoxy floor in a commercial unit laid by Dainamo Holdings"
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
                <Link href={`/capabilities/${capability.slug}`} className="capability-index__link">
                  <Frame
                    media={capabilityCover[capability.slug] ?? capability.media}
                    alt={describePhoto(capabilityCover[capability.slug] ?? capability.media, capability.name)}
                    sizes="(min-width: 1080px) 31vw, (min-width: 640px) 47vw, 100vw"
                    ratio={1.4}
                  />
                  <div className="capability-index__body">
                    <h2>{capability.name}</h2>
                    <p>{capability.lede}</p>
                    <span className="capability-index__cue">
                      What is included
                      <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="trades" className="trades section section--mist" aria-labelledby="trades-heading">
        <div className="shell">
          <div className="section-head section-head--split">
            <div>
              <h2 id="trades-heading" className="display-2">
                The trades that finish the job.
              </h2>
            </div>
            <p className="lede">
            Specialist work often turns up other jobs. A roof repair uncovers a damaged gutter, or a
            new floor needs a drain moved. We handle those on the same contract.
            </p>
          </div>

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
