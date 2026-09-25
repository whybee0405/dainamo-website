import type { Metadata } from 'next'

import { PageHead } from '../../../components/sections/PageHead'
import { CaseStudy } from '../../../components/sections/CaseStudy'
import { WorkGallery } from '../../../components/sections/WorkGallery'
import { BeforeAfter } from '../../../components/sections/BeforeAfter'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { breadcrumbSchema, jsonLd, projectSchema } from '../../../lib/schema'

const ANSWER =
  'Dainamo Holdings has completed resin flooring, waterproofing, roof sealing, floor repairs, damp proofing, line marking and full exterior refurbishments across Johannesburg. Every photograph on this page was taken on a Dainamo site. Clients are not named without their permission.'

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

      <PageHead
        title="Work we can show you."
        answer={ANSWER}
        crumbs={crumbs}
        media="grinding-warehouse"
        mediaAlt="A Dainamo operator diamond grinding a warehouse floor between yellow aisle markings"
      />

      <BeforeAfter tone="mist" />

      <WorkGallery />

      <div id="project">
        <CaseStudy showLink={false} />
      </div>

      <section className="detail section" aria-labelledby="scope-heading">
        <div className="shell detail__grid">
          <div className="detail__aside">
            <h2 id="scope-heading" className="display-3">
              The scope as it was written
            </h2>
            <p className="detail__note">
              Taken from the contract document. Everything below was priced and agreed before work
              started.
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
              All paint on this contract was applied with airless spray machines. On a building this
              size, spraying gives an even coat across every elevation, without the roller marks
              that show from the parking area.
            </p>
            <p>
              Scaffolding stood on site for four months. On an occupied complex, access is agreed
              first, because it decides the order of the work, where residents park and how long
              each elevation is out of use.
            </p>
          </div>
        </div>
      </section>

      <ConversionBand />
    </>
  )
}
