import type { Metadata } from 'next'
import { Phone, WhatsappLogo, EnvelopeSimple, Clock, MapPin } from '@phosphor-icons/react/dist/ssr'

import { PageHead } from '../../../components/sections/PageHead'
import { AssessmentForm } from '../../../components/forms/AssessmentForm'
import { getCmsCompany } from '../../../lib/cms'
import { breadcrumbSchema, jsonLd } from '../../../lib/schema'

const ANSWER =
  'Dainamo Holdings carries out free site assessments across Johannesburg and Gauteng. A contractor walks the building, takes moisture readings and measurements, photographs the failed details, and returns an itemised quotation with the exclusions stated. There is no obligation to accept it.'

export const metadata: Metadata = {
  title: 'Request a site assessment',
  description:
    'Book a free site assessment with Dainamo Holdings in Johannesburg for epoxy flooring, waterproofing, damp proofing or a maintenance contract. Itemised quotation, exclusions stated, no obligation.',
  alternates: { canonical: '/site-assessment' },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Request a site assessment', href: '/site-assessment' },
]

const steps = [
  'You send the details below, or you call.',
  'We phone back to agree a time that suits the building, not us.',
  'A contractor walks the site, takes readings and photographs the failures.',
  'You get an itemised quotation with measured areas and stated exclusions.',
]

export const dynamic = 'force-dynamic'

export default async function SiteAssessmentPage() {
  const company = await getCmsCompany()
  const whatsapp = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Hi Dainamo, I'd like to arrange a site assessment.",
  )}`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHead title="Request a site assessment." answer={ANSWER} crumbs={crumbs} />

      <section className="assess section">
        <div className="shell assess__grid">
          <div className="assess__form">
            <AssessmentForm />
          </div>

          <aside className="assess__aside">
            <div className="assess__block">
              <h2 className="assess__heading">How it goes</h2>
              <ol className="assess__steps">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="assess__block">
              <h2 className="assess__heading">Rather just talk</h2>
              <ul className="assess__contacts">
                {company.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a href={`tel:${phone.tel}`} data-cursor="link">
                      <Phone size={16} weight="fill" aria-hidden="true" />
                      <span>{phone.number}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={whatsapp} rel="noopener" data-cursor="link">
                    <WhatsappLogo size={17} weight="fill" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${company.email}`} data-cursor="link">
                    <EnvelopeSimple size={16} weight="fill" aria-hidden="true" />
                    <span>{company.email}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="assess__block">
              <h2 className="assess__heading">Where to find us</h2>
              <p className="assess__fact">
                <Clock size={16} weight="fill" aria-hidden="true" />
                <span>Monday to Friday, 07:00 to 17:00</span>
              </p>
              <p className="assess__fact">
                <MapPin size={16} weight="fill" aria-hidden="true" />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.suburb}, {company.address.city}, {company.address.postalCode}
                </span>
              </p>
            </div>

            <p className="assess__warning">
              Banking details are never changed by email. If you receive a message asking you to pay
              a new account, telephone the office and confirm it verbally first.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
