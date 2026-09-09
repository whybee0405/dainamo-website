import Link from 'next/link'
import { MapPin, EnvelopeSimple, Phone } from '@phosphor-icons/react/dist/ssr'

import { DainamoLockup } from '../brand/DainamoLockup'
import { nav, serviceAreas as fallbackServiceAreas, PRIMARY_CTA } from '../../lib/site'
import type { getCmsCompany } from '../../lib/cms'

type FooterCompany = Awaited<ReturnType<typeof getCmsCompany>>

const capabilityLinks = [
  { label: 'Epoxy and resin flooring', href: '/capabilities/epoxy-and-resin-flooring' },
  { label: 'Waterproofing', href: '/capabilities/waterproofing' },
  { label: 'Damp proofing', href: '/capabilities/damp-proofing' },
  { label: 'Maintenance contracts', href: '/capabilities/maintenance-contracts' },
]

export function SiteFooter({ company }: { company: FooterCompany }) {
  const serviceAreas = company.serviceAreas || fallbackServiceAreas
  return (
    <footer className="site-footer on-deep">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <DainamoLockup width={220} tone="dark" strapline />
          <p className="site-footer__blurb">
            A Johannesburg contractor for the work that has to be specified rather than patched:
            resin floors, waterproofing, damp remediation and planned maintenance for buildings that
            stay in use.
          </p>
          <Link href={PRIMARY_CTA.href} className="btn btn-primary" data-cursor="cta">
            {PRIMARY_CTA.label}
          </Link>
        </div>

        <div className="site-footer__cols">
          <div className="site-footer__col">
            <h2 className="site-footer__heading">Capabilities</h2>
            <ul>
              {capabilityLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Company</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/questions">Common questions</Link>
              </li>
            </ul>
          </div>

          <div className="site-footer__col site-footer__col--contact">
            <h2 className="site-footer__heading">Contact</h2>
            <ul>
              {company.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`}>
                    <Phone size={15} weight="fill" aria-hidden="true" />
                    <span>{phone.number}</span>
                    <span className="site-footer__phone-label">{phone.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`}>
                  <EnvelopeSimple size={15} weight="fill" aria-hidden="true" />
                  <span>{company.email}</span>
                </a>
              </li>
              <li>
                <span className="site-footer__address">
                  <MapPin size={15} weight="fill" aria-hidden="true" />
                  <span>
                    {company.address.street}
                    <br />
                    {company.address.suburb}, {company.address.city}, {company.address.postalCode}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="shell site-footer__areas">
        <h2 className="site-footer__heading">Where we work</h2>
        <p>
          {serviceAreas.join(' · ')} and the wider Gauteng region. Larger contracts are taken
          nationally by arrangement.
        </p>
      </div>

      <div className="shell site-footer__base">
        <p>
          © {new Date().getFullYear()} {company.legalName}. All rights reserved.
        </p>
        <p className="site-footer__legal">
          <Link href="/privacy">Privacy and data</Link>
        </p>
      </div>
    </footer>
  )
}
