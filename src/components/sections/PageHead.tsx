import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

export type Crumb = { name: string; href: string }

/**
 * Shared masthead for inner pages. The `answer` paragraph is written to be a
 * self contained response to the page's question, because that is the block an
 * assistant is most likely to quote.
 */
export function PageHead({
  eyebrow,
  title,
  answer,
  crumbs,
  children,
}: {
  eyebrow?: string
  title: string
  answer: string
  crumbs: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <header className="page-head">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            {crumbs.map((crumb, index) => (
              <li key={crumb.href}>
                {index < crumbs.length - 1 ? (
                  <>
                    <Link href={crumb.href}>{crumb.name}</Link>
                    <CaretRight size={11} weight="bold" aria-hidden="true" />
                  </>
                ) : (
                  <span aria-current="page">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && <p className="eyebrow page-head__eyebrow">{eyebrow}</p>}
        <h1 className="display-1 page-head__title">{title}</h1>
        <p className="lede page-head__answer">{answer}</p>
        {children}
      </div>
    </header>
  )
}
