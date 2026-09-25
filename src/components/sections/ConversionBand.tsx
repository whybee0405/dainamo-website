import Link from 'next/link'
import { ArrowRight, Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { Frame } from '../media/Frame'
import { company, PRIMARY_CTA } from '../../lib/site'

const promises = [
  'A contractor walks the site and takes readings',
  'A written scope with measured areas, itemised rates and exclusions',
  'A phasing plan that lets the building keep operating',
]

export function ConversionBand() {
  const whatsapp = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Hi Dainamo, I'd like to arrange a site assessment.",
  )}`

  return (
    <section className="convert on-deep" aria-labelledby="convert-heading">
      <div className="shell convert__inner">
        <div className="convert__copy">
          <p className="convert__eyebrow">Free site assessment</p>
          <h2 id="convert-heading" className="display-2">
            Tell us what is failing. We will come and look at it.
          </h2>
          <p className="convert__lede">
            Site assessments across Johannesburg and Gauteng. No charge for the visit, and no
            obligation to accept the quotation that follows it.
          </p>

          <ul className="convert__promises">
            {promises.map((promise) => (
              <li key={promise}>{promise}</li>
            ))}
          </ul>

          <div className="convert__actions">
            <Link href={PRIMARY_CTA.href} className="btn btn-light">
              {PRIMARY_CTA.label}
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </Link>
            <a href={whatsapp} className="btn btn-ghost-light" target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>

          <p className="convert__direct">
            Or call{' '}
            <a href={`tel:${company.phones[0].tel}`}>
              <Phone size={14} weight="fill" aria-hidden="true" />
              {company.phones[0].number}
            </a>{' '}
            between 07:00 and 17:00, Monday to Friday.
          </p>
        </div>

        <div className="convert__media">
          <Frame
            media="epoxy-entrance"
            alt="Steel-framed double doors opening onto a gloss epoxy floor finished by Dainamo Holdings"
            sizes="(min-width: 1080px) 42vw, 100vw"
            ratio={0}
          />
        </div>
      </div>
    </section>
  )
}
