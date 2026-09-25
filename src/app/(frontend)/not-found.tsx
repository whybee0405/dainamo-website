import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { nav, PRIMARY_CTA } from '../../lib/site'

export default function NotFound() {
  return (
    <section className="missing section">
      <div className="shell-tight">
        <p className="eyebrow">Page not found</p>
        <h1 className="display-1 missing__title">That page is not here.</h1>
        <p className="lede">
          The link may be old, or the page may have moved. Everything the site covers is one of
          these:
        </p>

        <ul className="missing__links">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="btn btn-secondary">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href={PRIMARY_CTA.href} className="btn btn-primary">
          {PRIMARY_CTA.label}
          <ArrowRight size={17} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
