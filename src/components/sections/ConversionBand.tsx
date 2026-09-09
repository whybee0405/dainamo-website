import Link from 'next/link'
import { ArrowRight, Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { DainamoEmblem } from '../brand/DainamoEmblem'
import { company, PRIMARY_CTA } from '../../lib/site'

const promises = [
  'A walk of the site with readings taken, not a guess from a photograph',
  'A written scope with measured areas, itemised rates and stated exclusions',
  'A phasing plan that keeps the building trading while we work',
]

export function ConversionBand() {
  const whatsapp = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Hi Dainamo, I'd like to arrange a site assessment.",
  )}`

  return (
    <section className="convert on-deep" aria-labelledby="convert-heading">
      <div className="shell convert__inner">
        <div className="convert__emblem" aria-hidden="true">
          <DainamoEmblem width={168} tone="dark" />
        </div>

        <div className="convert__copy">
          <h2 id="convert-heading" className="display-2">
            Tell us what is failing. We will come and look at it.
          </h2>
          <p className="lede">
            Site assessments across Johannesburg and Gauteng. No charge for the visit, and no
            obligation to accept the quotation that follows it.
          </p>

          <ul className="convert__promises">
            {promises.map((promise) => (
              <li key={promise}>{promise}</li>
            ))}
          </ul>

          <div className="convert__actions">
            <Link href={PRIMARY_CTA.href} className="btn btn-primary" data-cursor="cta">
              {PRIMARY_CTA.label}
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </Link>
            <a href={whatsapp} className="btn btn-secondary" data-cursor="link" rel="noopener">
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>

          <p className="convert__direct">
            Or call{' '}
            <a href={`tel:${company.phones[0].tel}`} data-cursor="link">
              <Phone size={14} weight="fill" aria-hidden="true" />
              {company.phones[0].number}
            </a>{' '}
            between 07:00 and 17:00, Monday to Friday.
          </p>
        </div>
      </div>
    </section>
  )
}
