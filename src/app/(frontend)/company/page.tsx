import type { Metadata } from 'next'

import { Reveal } from '../../../components/motion/Reveal'
import { PageHead } from '../../../components/sections/PageHead'
import { Frame } from '../../../components/media/Frame'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { getCmsCompany } from '../../../lib/cms'
import { breadcrumbSchema, jsonLd } from '../../../lib/schema'

const ANSWER =
  'Dainamo Holdings (Pty) Ltd is a multi-disciplinary construction, engineering and maintenance company based in City Deep, Johannesburg. It began in general handyman work and has grown into specialist coatings, waterproofing, damp proofing and contract maintenance for commercial, industrial, healthcare and managed residential property, while still carrying out general repairs.'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'Dainamo Holdings (Pty) Ltd is a Johannesburg construction, engineering and maintenance company specialising in coatings, waterproofing, damp proofing and planned maintenance contracts.',
  alternates: { canonical: '/company' },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Company', href: '/company' },
]

const values = [
  { name: 'Integrity', detail: 'Itemised quotations, with exclusions written down.' },
  { name: 'Quality', detail: 'Systems applied to the specified build, with the preparation done properly.' },
  { name: 'Safety', detail: 'Barriers, signage and site protection priced into every job.' },
  { name: 'Reliability', detail: 'We work to the programme agreed before the job starts.' },
  { name: 'Innovation', detail: 'Newer protective systems where ordinary products will not hold.' },
  { name: 'Customer satisfaction', detail: 'A final inspection with the client before handover.' },
]

export const dynamic = 'force-dynamic'

export default async function CompanyPage() {
  const company = await getCmsCompany()
  const serviceAreas = company.serviceAreas

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHead
        title="A Johannesburg contractor, built around specialist work."
        answer={ANSWER}
        crumbs={crumbs}
        media="scene-skyline"
        mediaPosition="40% 50%"
        mediaAlt="Illustrative scene: the Johannesburg skyline at dawn, seen from the south east"
      />

      <section className="story section" aria-labelledby="story-heading">
        <div className="shell story__grid">
          <Reveal variant="wipe" className="story__media" amount={0.2}>
            <Frame
              media="wall-crew"
              alt="A Dainamo crew replastering a long boundary wall from a scaffold"
              sizes="(min-width: 900px) 44vw, 100vw"
              ratio={1.1}
            />
          </Reveal>

          <div className="story__body">
            <h2 id="story-heading" className="display-2">
              How the company grew.
            </h2>
            <p>
              Dainamo started in general handyman work, and that work is still part of what we do.
              Over time the company took on larger and more technical jobs for businesses, shopping
              centres, hospitals, warehouses and townhouse complexes.
            </p>
            <p>
              Specialist coatings, waterproofing and damp treatment need training, equipment and
              product knowledge. There is less competition for that work, and clients judge it on
              whether it lasts as well as on price.
            </p>
            <p>
              Those jobs brought different clients. Commercial and institutional clients want
              continuity, documentation and a contractor who answers the phone when a roof leaks
              again in February.
            </p>
          </div>
        </div>
      </section>

      <section className="mission section section--mist" aria-labelledby="mission-heading">
        <div className="shell">
          <h2 id="mission-heading" className="sr-only">
            Mission, vision and values
          </h2>

          <div className="mission__pair">
            <div>
              <h3 className="mission__label">Mission</h3>
              <p className="display-3">
                High quality, reliable and innovative construction and maintenance services, with
                client relationships built on trust and professionalism.
              </p>
            </div>
            <div>
              <h3 className="mission__label">Vision</h3>
              <p className="display-3">
                To become a leading service provider in construction, maintenance and specialised
                coating systems across South Africa.
              </p>
            </div>
          </div>

          <div className="mission__values">
            {values.map((value) => (
              <div key={value.name} className="mission__value">
                <h3>{value.name}</h3>
                <p>{value.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="details section" aria-labelledby="details-heading">
        <div className="shell details__grid">
          <div>
            <h2 id="details-heading" className="display-3">
              Company details
            </h2>
            <dl className="details__list">
              <div>
                <dt>Registered name</dt>
                <dd>{company.legalName}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {company.address.street}
                  <br />
                  {company.address.suburb}, {company.address.city}, {company.address.postalCode}
                </dd>
              </div>
              <div>
                <dt>Telephone</dt>
                <dd>
                  {company.phones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} className="details__link">
                      {phone.number}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className="details__link">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Office hours</dt>
                <dd>Monday to Friday, 07:00 to 17:00</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="display-3">Where we work</h2>
            <p className="details__areas">{serviceAreas.join(' · ')}</p>
            <p className="details__note">
              Larger contracts are taken elsewhere in South Africa by arrangement. Travel and
              accommodation for work outside Gauteng is quoted separately, as its own line on the
              quotation.
            </p>
          </div>
        </div>
      </section>

      <ConversionBand />
    </>
  )
}
