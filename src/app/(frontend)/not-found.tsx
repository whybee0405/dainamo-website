import Link from 'next/link'

import { nav, PRIMARY_CTA } from '../../lib/site'

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell-tight" style={{ paddingBlock: '4rem' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          404
        </p>
        <h1 className="display-2" style={{ maxWidth: '18ch', marginBottom: '1.25rem' }}>
          That page is not here.
        </h1>
        <p className="lede" style={{ marginBottom: '2rem' }}>
          The link may be old, or the page may have moved. Everything the site covers is one of
          these:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="btn btn-secondary" data-cursor="link">
              {item.label}
            </Link>
          ))}
        </div>

        <Link href={PRIMARY_CTA.href} className="btn btn-primary" data-cursor="cta">
          {PRIMARY_CTA.label}
        </Link>
      </div>
    </section>
  )
}
