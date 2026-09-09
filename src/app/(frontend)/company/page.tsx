import type { Metadata } from 'next'

import { Reveal } from '../../../components/motion/Reveal'
import { PageHead } from '../../../components/sections/PageHead'
import { Frame } from '../../../components/media/Frame'
import { ConversionBand } from '../../../components/sections/ConversionBand'
import { company, serviceAreas } from '../../../lib/site'
import { breadcrumbSchema, jsonLd } from '../../../lib/schema'

const ANSWER =
  'Dainamo Holdings (Pty) Ltd is a multi-disciplinary construction, engineering and maintenance company based in City Deep, Johannesburg. It began in general handyman work and repositioned into specialist coatings, waterproofing, damp proofing and contract maintenance for commercial, industrial, healthcare and managed residential property.'

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
  { name: 'Integrity', detail: 'The number on the quotation is the number on the invoice.' },
  { name: 'Quality', detail: 'The system is built to specification, not to whatever is in the van.' },
  { name: 'Safety', detail: 'Site establishment and protection is priced, not improvised.' },
  { name: 'Reliability', detail: 'The programme we agree is the programme we work to.' },
  { name: 'Innovation', detail: 'Newer protective systems where conventional products will not hold.' },
  { name: 'Customer satisfaction', detail: 'Handover happens when the client signs it off, not when we leave.' },
]

export default function CompanyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHead title="Dainamo Holdings (Pty) Ltd" answer={ANSWER} crumbs={crumbs} />

      <section className="story section" aria-labelledby="story-heading">
        <div className="shell story__grid">
          <Reveal variant="wipe" className="story__media" amount={0.2}>
            <Frame
              media="maintenance-rooftop-plant"
              alt="A Dainamo Holdings technician servicing rooftop plant on a commercial building"
              sizes="(min-width: 900px) 44vw, 100vw"
              ratio={1.15}
            />
          </Reveal>

          <div className="story__body">
            <h2 id="story-heading" className="display-2">
              Why we stopped doing handyman work.
            </h2>
            <p>
              The handyman market in Johannesburg is crowded, and it competes almost entirely on
              price. As the volume and the type of work changed, so did the company. Today the focus
              is on specialised projects for businesses, shopping centres, hospitals, warehouses and
              townhouse complexes.
            </p>
            <p>
              Specialist coatings, waterproofing and damp treatment need training, equipment and
              product knowledge that a general trade does not carry. There is less competition in
              that market, and more room to be judged on whether the work lasts rather than on
              whether the quote was the cheapest one in the inbox.
            </p>
            <p>
              That decision also changed who we work for. Commercial and institutional clients need
              continuity, documentation and someone accountable when the roof leaks again in
              February. That is the relationship the company is now built around.
            </p>
          </div>
        </div>
      </section>

      <section className="mission section" aria-labelledby="mission-heading">
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
              accommodation for work outside Gauteng is quoted separately and shown as a line on the
              document rather than absorbed into the rate.
            </p>
          </div>
        </div>
      </section>

      <ConversionBand />
    </>
  )
}
