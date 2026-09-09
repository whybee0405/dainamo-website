import type { Metadata } from 'next'

import { PageHead } from '../../../components/sections/PageHead'
import { CaseStudy } from '../../../components/sections/CaseStudy'
import { ClientGallery } from '../../../components/sections/ClientGallery'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { breadcrumbSchema, jsonLd, projectSchema } from '../../../lib/schema'

const ANSWER =
  'Dainamo Holdings has completed exterior refurbishment, waterproofing, damp proofing, resin flooring and maintenance contracts across Johannesburg. Projects are published only where the client has agreed to it, which is why this page is short rather than padded out.'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Completed specialist contracting work by Dainamo Holdings in Johannesburg, including a full exterior refurbishment, waterproofing and repaint of a residential complex in Sandton.',
  alternates: { canonical: '/work' },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
]

const scope = [
  'Site establishment, protection and access for the duration of the contract',
  'Pressure washing and removal of loose and flaking paint across every elevation',
  'Crack repair and patching, then damp proofing to roughly a quarter of the project',
  'Waterproofing to parapets and other specified areas',
  'Damp Prime application, then two coats of exterior paint to all exterior walls',
  'Boundary walls, gutters, window frames, door frames and entrance doors',
  'One hundred and sixteen balcony balustrades prepared and refinished',
  'Daily site cleaning, rubble removal and disposal',
  'Final inspection and touch up before handover',
]

export default function WorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          projectSchema({
            name: 'Exterior refurbishment, waterproofing and painting, Buccleuch',
            description:
              'Full exterior refurbishment of a residential complex in Buccleuch, Sandton: preparation, crack repair, damp proofing, waterproofing and airless spray painting across approximately 26 747 square metres.',
            slug: 'buccleuch-exterior-refurbishment',
            location: 'Buccleuch, Sandton, Johannesburg',
          }),
        )}
      />

      <PageHead title="Work we can show you." answer={ANSWER} crumbs={crumbs} />

      <CaseStudy />

      <ClientGallery />

      <section className="detail section" aria-labelledby="scope-heading">
        <div className="shell detail__grid">
          <div className="detail__aside">
            <h2 id="scope-heading" className="display-3">
              The scope as it was written
            </h2>
            <p className="detail__note">
              Taken from the contract document. Everything below was priced, agreed and signed off
              before the first machine arrived on site.
            </p>
          </div>

          <ul className="detail__scope">
            {scope.map((item) => (
              <li key={item}>
                <span className="detail__marker" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="detail detail--alt section" aria-labelledby="method-heading">
        <div className="shell detail__grid">
          <div className="detail__aside">
            <h2 id="method-heading" className="display-3">
              Method of application
            </h2>
          </div>
          <div className="detail__prose">
            <p>
              All paint on this contract was applied using professional airless spray machines. On a
              building of this size that is the difference between an even film across every
              elevation and a finish that shows every roller lap from the parking area.
            </p>
            <p>
              Scaffolding stood on site for four months. Access on a live residential complex is the
              part of the programme that has to be agreed first, because it decides how the work is
              sequenced, where residents park and how long any one elevation is out of use.
            </p>
          </div>
        </div>
      </section>

      <ConversionBand />
    </>
  )
}
