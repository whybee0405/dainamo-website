import type { Metadata } from 'next'

import { PageHead } from '../../../components/sections/PageHead'
import { getCmsCompany } from '../../../lib/cms'
import { breadcrumbSchema, jsonLd } from '../../../lib/schema'

export const metadata: Metadata = {
  title: 'Privacy and data',
  description:
    'How Dainamo Holdings collects, uses and stores the personal information submitted through this website, in line with South African POPIA principles.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Privacy and data', href: '/privacy' },
]

export const dynamic = 'force-dynamic'

export default async function PrivacyPage() {
  const company = await getCmsCompany()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))} />

      <PageHead
        title="Privacy and data"
        answer="Dainamo Holdings collects only the contact and site details needed to respond to an enquiry, stores them securely, uses them for no other purpose, and deletes them on request."
        crumbs={crumbs}
      />

      <section className="prose section">
        <div className="shell-tight">
          <h2>What we collect</h2>
          <p>
            When a site assessment is requested through this website, the form asks for a contact
            name, an email address, a telephone number, and details of the building and the work
            required. An organisation name and a site location are optional but help us send the
            right person.
          </p>

          <h2>Why we collect it</h2>
          <p>
            To contact the person who made the enquiry, arrange a site visit, and prepare a
            quotation. That is the only purpose. Details submitted through this website are not sold,
            rented or shared with third parties for marketing.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries are kept for as long as they are commercially relevant, which normally means
            the life of the quotation and any contract that follows it, plus the retention period
            required for tax and accounting records. Enquiries that do not lead to work are removed
            once they are no longer useful.
          </p>

          <h2>Your rights</h2>
          <p>
            Under the Protection of Personal Information Act you may ask what personal information
            we hold about you, ask for it to be corrected, or ask for it to be deleted. Write to{' '}
            <a href={`mailto:${company.email}`}>{company.email}</a> or call{' '}
            <a href={`tel:${company.phones[0].tel}`}>{company.phones[0].number}</a> and the request
            will be actioned.
          </p>

          <h2>Cookies and measurement</h2>
          <p>
            This website sets no advertising cookies and does not track visitors across other sites.
            If website analytics are added later, this page will be updated before they are switched
            on.
          </p>

          <h2>Payments and banking details</h2>
          <p>
            Banking details are never changed by email. If you receive a message that appears to come
            from Dainamo Holdings with new or amended banking details, do not pay it. Telephone the
            office on {company.phones[0].number} and confirm verbally before transferring any money.
          </p>

          <h2>Who to contact</h2>
          <p>
            {company.legalName}
            <br />
            {company.address.street}, {company.address.suburb}
            <br />
            {company.address.city}, {company.address.postalCode}
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>
      </section>
    </>
  )
}
